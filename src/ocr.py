import pytesseract
from PIL import Image

# 유튜브 썸네일 이미지 불러오기
image = Image.open('thumbnail.jpg')

# 이미지에서 텍스트 추출
extracted_text = pytesseract.image_to_string(image)

print(extracted_text)
