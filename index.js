const textArea = document.createElement('textarea')
textArea.classList.add('textarea')
textArea.setAttribute('rows', '5')
textArea.setAttribute('cols', '50')

const keyboard = document.createElement('div')
keyboard.classList.add('keyboard')

const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')

const keys = [
  { key: '`', shift: '~', code: 'Backquote' },
  { key: '1', shift: '!', code: 'Digit1' },
  { key: '2', shift: '@', code: 'Digit2' },
  { key: '3', shift: '#', code: 'Digit3' },
  { key: '4', shift: '$', code: 'Digit4' },
  { key: '5', shift: '%', code: 'Digit5' },
  { key: '6', shift: '^', code: 'Digit6' },
  { key: '7', shift: '&', code: 'Digit7' },
  { key: '8', shift: '*', code: 'Digit8' },
  { key: '9', shift: '(', code: 'Digit9' },
  { key: '0', shift: ')', code: 'Digit0' },
  { key: '-', shift: '_', code: 'Minus' },
  { key: '=', shift: '+', code: 'Equal' },
  { key: 'Backspace', code: 'Backspace', class: 'backspace' },
  { key: 'Tab', code: 'Tab', class: 'tab' },
  { key: 'q', shift: 'Q', code: 'KeyQ' },
  { key: 'w', shift: 'W', code: 'KeyW' },
  { key: 'e', shift: 'E', code: 'KeyE' },
  { key: 'r', shift: 'R', code: 'KeyR' },
  { key: 't', shift: 'T', code: 'KeyT' },
  { key: 'y', shift: 'Y', code: 'KeyY' },
  { key: 'u', shift: 'U', code: 'KeyU' },
  { key: 'i', shift: 'I', code: 'KeyI' },
  { key: 'o', shift: 'O', code: 'KeyO' },
  { key: 'p', shift: 'P', code: 'KeyP' },
  { key: '[', shift: '{', code: 'BracketLeft' },
  { key: ']', shift: '}', code: 'BracketRight' },
  { key: '\\', shift: '|', code: 'Backslash' },
  { key: 'Del', code: 'Delete', class: 'del' },
  { key: 'CapsLock', code: 'CapsLock', class: 'capslock' },
  { key: 'a', shift: 'A', code: 'KeyA' },
  { key: 's', shift: 'S', code: 'KeyS' },
  { key: 'd', shift: 'D', code: 'KeyD' },
  { key: 'f', shift: 'F', code: 'KeyF' },
  { key: 'g', shift: 'G', code: 'KeyG' },
  { key: 'h', shift: 'H', code: 'KeyH' },
  { key: 'j', shift: 'J', code: 'KeyJ' },
  { key: 'k', shift: 'K', code: 'KeyK' },
  { key: 'l', shift: 'L', code: 'KeyL' },
  { key: ';', shift: ':', code: 'Semicolon' },
  { key: "'", shift: '"', code: 'Quote' },
  { key: 'Enter', code: 'Enter', class: 'enter' },
  { key: 'Shift', code: 'ShiftLeft', location: 1, class: 'shift-left' },
  { key: 'z', shift: 'Z', code: 'KeyZ' },
  { key: 'x', shift: 'X', code: 'KeyX' },
  { key: 'c', shift: 'C', code: 'KeyC' },
  { key: 'v', shift: 'V', code: 'KeyV' },
  { key: 'b', shift: 'B', code: 'KeyB' },
  { key: 'n', shift: 'N', code: 'KeyN' },
  { key: 'm', shift: 'M', code: 'KeyM' },
  { key: ',', shift: '<', code: 'Comma' },
  { key: '.', shift: '>', code: 'Period' },
  { key: '/', shift: '?', code: 'Slash' },
  { key: '▲', code: 'ArrowUp', class: 'arrow-up' },
  { key: 'Shift', code: 'ShiftRight', location: 2, class: 'shift-right' },
  { key: 'Ctrl', code: 'ControlLeft', class: 'ctrl' },
  { key: 'Win', code: 'MetaLeft', class: 'win' },
  { key: 'Alt', code: 'AltLeft', location: 1, class: 'alt' },
  { key: 'Space', code: 'Space', class: 'space' },
  { key: 'Alt', code: 'AltRight', location: 2, class: 'alt' },
  { key: '◄', code: 'ArrowLeft', class: 'arrow-left' },
  { key: '▼', code: 'ArrowDown', class: 'arrow-down' },
  { key: '►', code: 'ArrowRight', class: 'arrow-right' },
  { key: 'Ctrl', code: 'ControlRight', location: 'rigt', class: 'ctrl' },
]

// Create a function to create buttons on the keyboard
function createKeys() {
  const keysContainer = document.createElement('div')
  keysContainer.classList.add('keyboard__container')
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const button = document.createElement('button')
    button.classList.add('key', `${key.class}`)
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
  if (key) {
    const event = new KeyboardEvent('keydown', { code: shift ? e.target.dataset.shift.charCodeAt() : key })
    document.dispatchEvent(event)
  }
}

// Add the keyboard for the page
keyboard.appendChild(createKeys())
document.body.appendChild(textArea)
document.body.appendChild(keyboard)

// Add handles for buttons
const keysContainer = document.querySelector('.keyboard__container')
keysContainer.addEventListener('click', handleKeys)

// Add symbos by keyboard
document.addEventListener('keydown', printKeysByKeyboard)

function printKeysByKeyboard(event) {
  if (
    !event.key ===
    [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Delete',
      'Backspace',
      'Enter',
      'Shift',
      'Alt',
      'Control',
      'CapsLock',
      'Tab',
    ].includes(event.key)
  ) {
    textArea.value += event.key
  }
}

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

// Add animation for the virtual keyboard when pressing on the physical one
document.addEventListener('keydown', showButton)

function showButton(event) {
  const keyBoard = document.querySelectorAll('.keyboard__container .key')
  keyBoard.forEach(function (element) {
    if (element.getAttribute('data-code') === event.code) {
      element.classList.add('active')
    }
    document.addEventListener('keyup', () => {
      element.classList.remove('active')
    })
  })
}
