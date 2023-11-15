"""
next_page = soup.find(attrs={"name":"go-to-results-page-2"})
if (next_page):  # TESTING
    next_page = next_page.span.text
    print(next_page)
    print("Second page found")
else:
    print("Second page not found")

extra_pages = []
for pages in extra_pages:
    ...
"""