from backend.models import *
import requests
import json


def create_courses(path="./json_files/", name="default.json"):
    print(path)
    json_file = open(path + name, "r")
    print()
    print(json.loads(json_file))


def create_courses_files(url='https://courseoutline.auckland.ac.nz/dco/course/advanceSearch?advanceSearchText=&termCodeYear=&termCodeTerm=&facultyId=4000&organisationCode=LEIGH&stage='):
    r = requests.get(url)
    print(r.status_code, r.encoding)
    print()
    print(type(r.text))
    # script_file = open('./backend/create_courses/cleanData.js', 'r')

    html_path = './backend/uoa_courses.html'
    f = open(html_path, 'w')
    r = r.text.split('</body>')
    r = r[0] + '<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script><script src="../cleanData.js"></script>' + r[1]
    f.write(r)
    f.close()

    return html_path
