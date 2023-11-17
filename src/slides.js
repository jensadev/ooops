import json from './lessons.json'

export function run(element) {
  console.log(json)
  console.log(element)
  const numberOfLessons = json.lessons.length
  let currentLesson = 0
  let numberOfSlides = json.lessons[currentLesson].content.length
  let currentSlide = 0
  // const slideElement = document.querySelector('#slide')

  const nextLesson = () => {
    currentLesson = (currentLesson + 1) % numberOfLessons
    currentSlide = 0
    numberOfSlides = json.lessons[currentLesson].content.length
    render()
  }

  const previousLesson = () => {
    currentLesson = (currentLesson - 1 + numberOfLessons) % numberOfLessons
    currentSlide = 0
    numberOfSlides = json.lessons[currentLesson].content.length
    render()
  }

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % numberOfSlides
    render()
  }

  const previousSlide = () => {
    currentSlide = (currentSlide - 1 + numberOfSlides) % numberOfSlides
    render()
  }

  const render = () => {
    const lesson = json.lessons[currentLesson]
    const slide = json.lessons[currentLesson].content[currentSlide]

    let hasPrevSlide = currentSlide > 0
    let hasNextSlide = currentSlide < numberOfSlides - 1
    let hasPrevLesson = currentLesson > 0
    let hasNextLesson = currentLesson < numberOfLessons - 1

    element.innerHTML = `
      <main class="flow">
        <header class="container region flow">
          <h1>${lesson.title}</h1>
          <ul class="keywords" role="list">
            ${lesson.keywords
              .map(
                (keyword) =>
                  `<li>
                  <details><summary>${keyword.word}</summary>${keyword.description}</details></li>`
              )
              .join('')}
          </ul>
        </header>
        <article id="slide" class="flow">
          <h2 class="container">${slide.title}</h2>
          <ul class="container sub" role="list">
            ${slide.purpose.map((p) => `<li>${p}</li>`).join('')}
          </ul>
          <div class="container inner flow">
            <ul class="points">
              ${slide.points.map((point) => `<li>${point}</li>`).join('')}
            </ul>
            ${
              slide.illustration
                ? `<img class="" src="${slide.illustration.url}" alt="${slide.illustration.alt}" />`
                : ''
            }
            ${slide.explanation.map((ex) => `<p>${ex}</p>`).join('')}
            ${
              slide.exercise
                ? `<div class="exercise flow">
                <h3>${slide.exercise.title}</h3>
                <p>${slide.exercise.description}</p>
                </div>`
                : ''
            }
          </div>
        </article>
        <footer class="container region">
          <div class="controls">
            <button id="prevLesson" ${
              hasPrevLesson ? '' : 'disabled'
            }>&lsaquo;&lsaquo;</button>
            <button id="prevSlide" ${
              hasPrevSlide ? '' : 'disabled'
            }>&lsaquo;</button>
            <button id="questions">?</button>
            <button id="nextSlide" ${
              hasNextSlide ? '' : 'disabled'
            }>&rsaquo;</button>
            <button id="nextLesson" ${
              hasNextLesson ? '' : 'disabled'
            }>&rsaquo;&rsaquo;</button>
          </div>
        </footer>
        <div id="questionsModal" class="modal">
          <div class="modal-content">
            <span id="close">&times;</span>
            <div class="content region flow">
            <h2>Frågor</h2>
            <ul class="questions flow" role="list">
            ${lesson.questions
              .map(
                (q) => `<li>
                <details><summary>${q.question}</summary>
                ${q.answer}</details></li>`
              )
              .join('')}
          </ul>
          </div>
          <div class="content region flow">
          <h2>Övningsuppgift</h2>
            <h3>${lesson.exercise.title}</h3>
            <h4>Material: ${lesson.exercise.material}</h4>
            <p>${lesson.exercise.description}</p>
            <p>${lesson.exercise.instructions}</p>
          </div>
        </div>
      </main>
    `

    document.querySelector('#slide').scrollIntoView()

    document.getElementById('questions').addEventListener('click', function () {
      document.getElementById('questionsModal').style.display = 'block'
    })

    document.getElementById('close').addEventListener('click', function () {
      document.getElementById('questionsModal').style.display = 'none'
    })

    document
      .querySelector('#prevSlide')
      .addEventListener('click', previousSlide)
    document.querySelector('#nextSlide').addEventListener('click', nextSlide)
    document
      .querySelector('#prevLesson')
      .addEventListener('click', previousLesson)
    document.querySelector('#nextLesson').addEventListener('click', nextLesson)
  }

  render()
}
