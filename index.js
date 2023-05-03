import { keysEn, keysRu } from './language.js'

// Create elements of body
const title = document.createElement('h1')
title.classList.add('title')
title.textContent = 'RSS Виртуальная клавиатура'
const textArea = document.createElement('textarea')
textArea.classList.add('textarea')
textArea.setAttribute('rows', '5')
textArea.setAttribute('cols', '50')
const keyboard = document.createElement('div')
keyboard.classList.add('keyboard')
const text = document.createElement('p')
text.classList.add('text')
text.textContent = 'Клавиатура создана в операционной системе Windows  '
const change = document.createElement('p')
change.classList.add('text')
change.textContent = 'Для переключения языка комбинация: левый ctrl-alt'
const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')

// Create a function to create buttons on the keyboard
function createKeys(keys) {
  const keysContainer = document.createElement('div')
  keysContainer.classList.add('keyboard__container')
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const button = document.createElement('button')
    if (key.class) {
      button.classList.add('key', `${key.class}`)
    } else {
      button.classList.add('key')
    }
    button.textContent = key.key
    button.dataset.code = key.code
    if (key.shift) {
      button.dataset.shift = key.shift
    }
    keysContainer.appendChild(button)
  }
  return keysContainer
}

// Create a function print text by presed keyboard
document.addEventListener('keydown', (e) => {
  const key = e.code
  const shift = e.shiftKey
  const capslock = e.getModifierState('CapsLock')
  printBykeyBoard(key, shift, capslock)
})

//Add handle for board visual
document.addEventListener('click', (e) => {
  const key = e.target.dataset.code
  const shift = e.shiftKey
  const capslock = e.getModifierState('CapsLock')
  printBykeyBoard(key, shift, capslock)
  setTimeout(() => {
    e.target.classList.remove('active')
  }, 200)
})

function printBykeyBoard(key, shift, capslock) {
  const virtualKey = document.querySelector(`[data-code="${key}"]`)
  let code
  if (virtualKey && !specialKeysCode.includes(virtualKey.dataset.code)) {
    if (capslock && !shift && virtualKey.textContent.match(/[a-zA-Zа-яА-Я]/)) {
      code = virtualKey.textContent.toUpperCase()
    } else if (!capslock && shift) {
      code = virtualKey.dataset.shift
    } else {
      code = virtualKey.textContent
    }
    const event = new KeyboardEvent('keydown', { code })
    document.dispatchEvent(event)
    virtualKey.classList.add('active')
    textArea.value += event.code
  } else if (virtualKey && specialKeysCode.includes(virtualKey.dataset.code)) {
    virtualKey.classList.add('active')
  }
}

// Remove class active by keys
document.addEventListener('keyup', (e) => {
  const key = e.code
  const virtualKey = document.querySelector(`[data-code="${key}"]`)
  virtualKey.classList.remove('active')
})

// Add the keyboard for the page
const elements = [title, textArea, keyboard, text, change]
elements.forEach((element) => {
  document.body.appendChild(element)
})

// Disable standard input event handling
textArea.addEventListener('keydown', function (event) {
  if (event.type === 'keydown') {
    event.preventDefault()
  }
})

// Add handle for the backspace
document.addEventListener('keydown', dellBackSpace)
document.addEventListener('click', dellBackSpace)

function dellBackSpace(event) {
  if (event.type === 'keydown') {
    if (event.key === 'Backspace') {
      addCursor()
    }
  } else if (event.type === 'click') {
    if (event.target.dataset.code === 'Backspace') addCursor()
  }
}

function addCursor() {
  const cursorPosition = textArea.selectionStart
  const currentValue = textArea.value
  if (cursorPosition > 0) {
    const newValue = currentValue.substring(0, cursorPosition - 1) + currentValue.substring(cursorPosition)
    textArea.value = newValue
    textArea.setSelectionRange(cursorPosition - 1, cursorPosition - 1)
  }
}

// Add handle for the Enter
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
  }
})
document.addEventListener('click', (event) => {
  if (event.target.dataset.code === 'Enter') {
    textArea.value += '\n'
  }
})

// Add handle for the Space
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    textArea.value += ' '
  }
})

document.addEventListener('click', (event) => {
  if (event.target.dataset.code === 'Space') {
    textArea.value += ' '
  }
})

// Add handle for the Tab
document.addEventListener('keydown', (event) => {
  if (event.code === 'Tab') {
    textArea.value += '    '
  }
})

document.addEventListener('click', (event) => {
  if (event.target.dataset.code === 'Tab') {
    textArea.value += '    '
  }
})

// Add symbos by keyboard and animation for the virtual keyboard when pressing on the physical one
const specialKeysCode = [
  'Delete',
  'Backspace',
  'Enter',
  'ShiftLeft',
  'ShiftRight',
  'AltLeft',
  'AltRight',
  'ControlLeft',
  'ControlRigth',
  'CapsLock',
  'Tab',
  'Space',
]

//Change the language
document.addEventListener('keydown', changeLang)

let isCtrlPressed = false
let isAltPressed = false

function changeLang(event) {
  if (event.code === 'ControlLeft') {
    isCtrlPressed = true
  }

  if (event.code === 'AltLeft') {
    isAltPressed = true
  }

  if (isCtrlPressed && isAltPressed) {
    keyboard.innerHTML = ''
    if (lang === 'en') {
      keyboard.appendChild(createKeys(keysRu))
      lang = 'ru'
    } else {
      keyboard.appendChild(createKeys(keysEn))
      lang = 'en'
    }
  }
  localStorage.setItem('language', lang)
}

// Create remember language
const LANG_KEY = 'language'
const DEFAULT_LANG = 'en'

function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang)
}

function getLanguage() {
  return localStorage.getItem(LANG_KEY) || DEFAULT_LANG
}
if (!localStorage.getItem(LANG_KEY)) {
  setLanguage(DEFAULT_LANG)
}
let lang = getLanguage()

if (lang === 'ru') {
  keyboard.appendChild(createKeys(keysRu))
} else {
  keyboard.appendChild(createKeys(keysEn))
}

// Add handle for Ctrl and Alt return false
document.addEventListener('keyup', function (event) {
  if (event.code === 'ControlLeft') {
    isCtrlPressed = false
  }

  if (event.code === 'AltLeft') {
    isAltPressed = false
  }
})
