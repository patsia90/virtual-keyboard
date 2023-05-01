import { keysEn, keysRu } from './language.js'

const textArea = document.createElement('textarea')
textArea.classList.add('textarea')
textArea.setAttribute('rows', '5')
textArea.setAttribute('cols', '50')

const keyboard = document.createElement('div')
keyboard.classList.add('keyboard')

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

// Create a function to handle pressing buttons

function handleKeys(e) {
  const key = e.target.dataset.code
  const shift = e.shiftKey
  if (key && !specialKeysCode.includes(key)) {
    const event = new KeyboardEvent('keydown', { code: shift ? e.target.dataset.shift : e.target.textContent })
    document.dispatchEvent(event)
    textArea.value += event.code
  }
}

// Create a function print text by presed keyboard
document.addEventListener('keydown', printBykeyBoard)
function printBykeyBoard(e) {
  const key = e.code
  const shift = e.shiftKey
  const capslock = e.getModifierState('CapsLock')
  const virtualKey = document.querySelector(`[data-code="${key}"]`)
  virtualKey.classList.add('active')
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
    textArea.value += event.code
  }
}

// Remove class active by keys
document.addEventListener('keyup', (e) => {
  const key = e.code
  const virtualKey = document.querySelector(`[data-code="${key}"]`)
  virtualKey.classList.remove('active')
})

// Add the keyboard for the page
keyboard.appendChild(createKeys(keysEn))
document.body.appendChild(textArea)
document.body.appendChild(keyboard)

// Add handles for buttons
const keysContainer = document.querySelector('.keyboard__container')
keysContainer.addEventListener('click', handleKeys)

// Disable standard input event handling
textArea.addEventListener('keydown', function (event) {
  if (event.type === 'keydown') {
    event.preventDefault()
  }
})

// Add handle for the backspace
document.addEventListener('keydown', dellBackSpace)

function dellBackSpace(event) {
  if (event.key === 'Backspace') {
    textArea.value = textArea.value.slice(0, -1)
  }
}

// Add handle for the Enter
document.addEventListener('keydown', lineBreak)

function lineBreak(event) {
  if (event.key === 'Enter') {
    textArea.value += '\n'
  }
}

// Add handle for the Space
document.addEventListener('keydown', addSpace)

function addSpace(event) {
  if (event.code === 'Space') {
    textArea.value += ' '
  }
}

// Add handle for the Tab
document.addEventListener('keydown', addTab)

function addTab(event) {
  if (event.code === 'Tab') {
    textArea.value += '    '
  }
}

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

let control = null
let alt = null
let language = 'En'

function changeLang(event) {
  if (event.key === 'Control') {
    control = event.key
  } else if (event.key === 'Alt' && control) {
    alt = event.key
    keyboard.innerHTML = ''
    if (language === 'En') {
      keyboard.appendChild(createKeys(keysRu))
      control = null
      alt = null
      language = 'Ru'
    } else {
      keyboard.appendChild(createKeys(keysEn))
      control = null
      alt = null
      language = 'En'
    }
  }
}
