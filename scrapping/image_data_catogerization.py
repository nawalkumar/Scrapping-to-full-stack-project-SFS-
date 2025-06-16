from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import os
import requests
import pandas as pd
from urllib.parse import urljoin
import uuid  # Import the uuid module

categories = {
    "students": ["student", "boy", "girl", "kids", "children", "pupil"],
    "teachers": ["teacher", "professor", "staff", "faculty"],
    "building": ["building", "campus", "infrastructure", "classroom", "school"],
    "event": ["event", "celebration", "competition", "annual", "function"],
    "sports": ["sports", "football", "cricket", "games", "athletics"],
    "others": []
}

def classify_alt(alt_text):
    alt_text = alt_text.lower()
    for category, keywords in categories.items():
        if any(keyword in alt_text for keyword in keywords):
            return category
    return "others"

# List of school websites to scrape
school_urls = [
    "https://www.npsinr.com",
    "https://www.dpsbangalore.edu.in"
]

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

if not os.path.exists("downloaded_images"):
    os.makedirs("downloaded_images")

data = []

for url in school_urls:
    try:
        print(f"Visiting: {url}")
        driver.get(url)
        time.sleep(5)

        images = driver.find_elements(By.TAG_NAME, 'img')

        for idx, img in enumerate(images):
            src = img.get_attribute('src')
            alt = img.get_attribute('alt') or "No alt text"

            if not src:
                continue

            full_url = urljoin(url, src)
            category = classify_alt(alt)

            local_file = "Failed"
            try:
                img_data = requests.get(full_url, timeout=5).content
                local_file = f"downloaded_images/{url.split('//')[-1].split('.')[0]}_{idx}.jpg"
                with open(local_file, 'wb') as f:
                    f.write(img_data)
            except Exception as e:
                print(f"Failed to download {full_url}: {e}")

            # Generate a unique ID for each entry
            unique_id = str(uuid.uuid4())

            data.append({
                "ID": unique_id,  # Include the unique ID in the data
                "Website": url,
                "Image_URL": full_url,
                "Alt_Text": alt,
                "Category": category,
                "Local_File": local_file
            })

    except Exception as e:
        print(f"Error accessing {url}: {e}")

df = pd.DataFrame(data)
df.to_csv("categorized_school_images.csv", index=False)
print("Saved all image data to categorized_school_images.csv")

driver.quit()