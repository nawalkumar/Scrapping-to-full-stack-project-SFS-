from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import os
import requests
import pandas as pd
from urllib.parse import urljoin
import uuid
from google.cloud import vision
import io

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\ASUS\Downloads\edurecog-6c5710f9fe07.json"

categories = {
    "students": ["student", "boy", "girl", "kids", "children", "pupil"],
    "teachers": ["teacher", "professor", "staff", "faculty"],
    "building": ["building", "campus", "infrastructure", "classroom", "school"],
    "event": ["event", "celebration", "competition", "annual", "function"],
    "sports": ["sports", "football", "cricket", "games", "athletics"],
    "swimming_pool": ["pool", "swimming", "aquatic"]
}

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

if not os.path.exists("downloaded_images"):
    os.makedirs("downloaded_images")

def detect_labels(image_content):
    try:
        client = vision.ImageAnnotatorClient()
        image = vision.Image(content=image_content)
        response = client.label_detection(image=image)
        labels = response.label_annotations
        
        # Exclude facial features and focus on objects/people
        excluded_terms = ["eye", "nose", "eyebrow", "mouth", "hair", "face", "skin", "cheek", "lip"]
        filtered_labels = [
            (label.description, label.score)
            for label in labels
            if not any(term in label.description.lower() for term in excluded_terms)
            and label.score >= 0.7  # High-confidence labels only
        ]
        
        return filtered_labels
    except Exception as e:
        print(f"Error detecting labels: {e}")
        return []

def categorize_by_confidence(labels):
    for label, confidence in labels:
        label_lower = label.lower()
        for category, keywords in categories.items():
            if any(keyword in label_lower for keyword in keywords):
                return category
    return "others"

school_urls = [
    "https://www.npsinr.com",
    "https://www.dpsbangalore.edu.in",
    "https://dpsrkp.net/"
]

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
            try:
                img_data = requests.get(full_url, timeout=5).content
            except Exception as e:
                print(f"Failed to download {full_url}: {e}")
                continue

            labels = detect_labels(img_data)
            top_labels = sorted(labels, key=lambda x: x[1], reverse=True)[:5]
            category = categorize_by_confidence(top_labels)

            local_file = f"downloaded_images/{url.split('//')[-1].split('.')[0]}_{idx}.jpg"
            try:
                with open(local_file, 'wb') as f:
                    f.write(img_data)
            except Exception as e:
                print(f"Failed to save image {local_file}: {e}")
                continue

            unique_id = str(uuid.uuid4())

            data.append({
                "ID": unique_id,
                "Website": url,
                "Image_URL": full_url,
                "Alt_Text": alt,
                "Detected_Labels": top_labels,
                "Category": category,
                "Local_File": local_file
            })

    except Exception as e:
        print(f"Error accessing {url}: {e}")

try:
    df = pd.DataFrame(data)
    df.to_csv("categorized_school_images_with_confidence1.csv", index=False)
    print("Saved all image data to categorized_school_images_with_confidence.csv")
except Exception as e:
    print(f"Error saving data to CSV: {e}")

driver.quit()