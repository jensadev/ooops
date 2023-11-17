import json from './slides.json'

export function run(element) {
  console.log(json)
  console.log(element)
  const numberOfLessons = json.lessons.length
  let currentLesson = 0

  const slideElement = document.querySelector('#slide')

  const nextLesson = () => {
    currentLesson = (currentLesson + 1) % numberOfLessons
    render()
    slideElement.scrollIntoView()
  }

  const previousLesson = () => {
    currentLesson = (currentLesson - 1 + numberOfLessons) % numberOfLessons
    render()
    slideElement.scrollIntoView()
  }

  const numberOfSlides = json.lessons[currentLesson].content.length
  let currentSlide = 0

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % numberOfSlides
    render()
    slideElement.scrollIntoView()
  }

  const previousSlide = () => {
    currentSlide = (currentSlide - 1 + numberOfSlides) % numberOfSlides
    render()
    slideElement.scrollIntoView()
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
          <p>${lesson.purpose}</p>
          <h2>Begrepp</h2>
          <ul class="keywords">
            ${lesson.keywords
              .map(
                (keyword) => `<li>${keyword.word} : ${keyword.description}</li>`
              )
              .join('')}
          </ul>
        </header>
        <article id="slide" class="flow">
          <h2 class="container">${slide.title}</h2>
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
          <div class="modal-content region container">
            <span id="close">&times;</span>
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
        </div>
      </main>
    `

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
