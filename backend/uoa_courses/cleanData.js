try {
  // getting data from html
  var courseParentDivs = document.querySelectorAll(".course-card-details");
  var courses = [];
  console.log(courseParentDivs.length);
  courseParentDivs.forEach((courseHtml) => {
    try {
      var course = {};
      course["code"] = courseHtml.querySelector(".course-code").innerText;
      course["title"] = courseHtml.querySelector(".course-title").innerText;
      try {
        course["desc"] = courseHtml
          .querySelector(".course-prescription")
          .innerText.trim();
      } catch (error) {
        course["desc"] = "";
        console.log(
          "this course has no course prescription or desc so left empty"
        );
        // console.error(error);
      }
      courses[courses.length] = course;
    } catch (error) {
      console.log(
        "error has arisen with finding suitable course information for following course"
      );
      console.log(courseHtml);
      console.error(error);
    }
  });
} catch (error) {
  console.log("error has arisen with finding all the course divs");
  console.log();
  console.error(error);
}

// Scroll to the bottom for data on student services fee - unrelated to course fees
// https://www.calendar.auckland.ac.nz/en/genregs/fees/fees-all-students1-data.html

function getCookie(name) {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith(name + "="));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
}
// sending data to django server :))
// var xhr = new XMLHttpRequest();
// xhr.open("POST", "http://localhost:8000/backend/create-courses/");
// xhr.setRequestHeader("x-csrf-token", "fetch");
// xhr.setRequestHeader("Content-Type", "application/json");
// console.log(courses);
// xhr.send(JSON.stringify({ courses: courses }));
// console.log(xhr);

// const csrfToken = getCookie("CSRF-TOKEN");

// f = fetch("http://localhost:8000/backend/create-courses/", {
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json; charset=UTF-8",
//     "X-CSRFToken": csrfToken,
//     credentials: "include",
//   },
//   body: JSON.stringify({ courses: courses }),
// })
//   .then((res) => console.log(res))
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

//svaing to json file instead
function saveFile(text, name, type) {
  var a = document.createElement("a");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

function saveFile2(content, name, type) {
  var myFile = new File(["holo"], name, {
    type: type,
  });
  saveAs(myFile);
}

// function saveFile3(content, name, type) {
//   var myBlob = new Blob(["CONTENT"], { type: "text/plain" });
//   localStorage.setItem("myBlob", myBlob);
// }

saveFile2(
  JSON.stringify({ courses: courses }),
  "./json_files/courses_1.txt",
  "text/plain"
);

// saveFile3(
//   JSON.stringify({ courses: courses }),
//   "./json_files/courses_1.txt",
//   "text/plain"
// );
