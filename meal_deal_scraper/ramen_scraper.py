import requests
from bs4 import BeautifulSoup
import json
from pathlib import Path

# list of urls sandwiches, snacks, drinks
url_list = [
    "https://www.tesco.com/groceries/en-GB/search?query=mealdeal&department=Chilled%20Soup%2C%20Sandwiches %26%20Salad%20Pots&viewAll=department%2Caisle%2Cshelf&aisle=Lunch%20Meal%20Deals&shelf=%C2%A33.90%20Meal%20Deal%20Mains",
    "https://www.tesco.com/groceries/en-GB/search?query=meal deal&department=Chilled%20Soup%2C%20Sandwiches %26%20Salad%20Pots&viewAll=department%2Caisle%2Cshelf&aisle=Lunch%20Meal%20Deals&shelf=Meal%20Deal%20Drinks",
    "https://www.tesco.com/groceries/en-GB/search?query=meal deal&department=Chilled%20Soup%2C%20Sandwiches %26%20Salad%20Pots&viewAll=department%2Caisle%2Cshelf&aisle=Lunch%20Meal%20Deals&shelf=Meal%20Deal%20Snacks"
]
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
}

# start of main loop // get response and make soup
for url in url_list:
    raw_html_response = requests.get(url, headers=headers)
    if(raw_html_response.ok == False):
        print('Response not ok')     
    soup = BeautifulSoup(raw_html_response.text, 'lxml') 

# collect and distribute data
    images = []
    prices = []
    names = []
    items = soup.find_all(class_='product-list--list-item')
    for item in items:
        if type(item) != None:
            try:
                list_item_price = item.form.p.text
                prices.append(list_item_price)
            except AttributeError:
                list_item_price = ''
                
            try:
                list_item_name = item.h3.a.span.text
                names.append(list_item_name)
            except AttributeError:
                list_item_name = '' 
                        
            try:
                current_image = item.a.img['srcset']
                sep = 'jpeg'
                current_image_formatted = current_image.split(sep, 1)[0] + 'jpeg'
                images.append(current_image_formatted)
            except AttributeError:
                list_item_img = ''
    full_item_info = []
    for info in zip(images, names, prices):
        full_item_info.append(info)

    # write to file
    full_item_info_dict = [dict(zip(("src", "itemName", "price"), x)) for x in full_item_info]
    base = Path(r"C:\Users\user\Desktop\projects\meal_deal\meal_deal_scraper\data")
    if (url[-6] == "0"):
        filename_section = url[-5:]
        filename_section = filename_section.lower()
    else:
        filename_section = url[-6:]
        filename_section = filename_section.lower()
    filename = filename_section + "_item_data.ts"
    jsonpath = base / filename
    with open(jsonpath, 'w') as fo:
        fo.write(f'export const {filename_section}_item_data = ')
        json.dump(full_item_info_dict, fo, indent=4)
