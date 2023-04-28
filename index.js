const textArea = document.createElement('textarea')
textArea.classList.add('textarea')
textArea.setAttribute('rows', '5')
textArea.setAttribute('cols', '50')
textArea.setAttribute('id', 'textarea')

const keyboard = document.createElement('div')
keyboard.classList.add('keyboard')

const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')

const keys = [
  { key: '`', shift: '~', keyCode: 192 },
  { key: '1', shift: '!', keyCode: 49 },
  { key: '2', shift: '@', keyCode: 50 },
  { key: '3', shift: '#', keyCode: 51 },
  { key: '4', shift: '$', keyCode: 52 },
  { key: '5', shift: '%', keyCode: 53 },
  { key: '6', shift: '^', keyCode: 54 },
  { key: '7', shift: '&', keyCode: 55 },
  { key: '8', shift: '*', keyCode: 56 },
  { key: '9', shift: '(', keyCode: 57 },
  { key: '0', shift: ')', keyCode: 48 },
  { key: '-', shift: '_', keyCode: 189 },
  { key: '=', shift: '+', keyCode: 187 },
  { key: 'Backspace', keyCode: 8, class: 'backspace' },
  { key: 'Tab', keyCode: 9, class: 'tab' },
  { key: 'q', shift: 'Q', keyCode: 81 },
  { key: 'w', shift: 'W', keyCode: 87 },
  { key: 'e', shift: 'E', keyCode: 69 },
  { key: 'r', shift: 'R', keyCode: 82 },
  { key: 't', shift: 'T', keyCode: 84 },
  { key: 'y', shift: 'Y', keyCode: 89 },
  { key: 'u', shift: 'U', keyCode: 85 },
  { key: 'i', shift: 'I', keyCode: 73 },
  { key: 'o', shift: 'O', keyCode: 79 },
  { key: 'p', shift: 'P', keyCode: 80 },
  { key: '[', shift: '{', keyCode: 219 },
  { key: ']', shift: '}', keyCode: 221 },
  { key: '\\', shift: '|', keyCode: 220 },
  { key: 'Del', keyCode: 46, class: 'del' },
  { key: 'CapsLock', keyCode: 20, class: 'capslock' },
  { key: 'a', shift: 'A', keyCode: 65 },
  { key: 's', shift: 'S', keyCode: 83 },
  { key: 'd', shift: 'D', keyCode: 68 },
  { key: 'f', shift: 'F', keyCode: 70 },
  { key: 'g', shift: 'G', keyCode: 71 },
  { key: 'h', shift: 'H', keyCode: 72 },
  { key: 'j', shift: 'J', keyCode: 74 },
  { key: 'k', shift: 'K', keyCode: 75 },
  { key: 'l', shift: 'L', keyCode: 76 },
  { key: ';', shift: ':', keyCode: 186 },
  { key: "'", shift: '"', keyCode: 222 },
  { key: 'Enter', keyCode: 13, class: 'enter' },
  { key: 'Shift', keyCode: 16, location: 'left', class: 'shift-left' },
  { key: 'z', shift: 'Z', keyCode: 90 },
  { key: 'x', shift: 'X', keyCode: 88 },
  { key: 'c', shift: 'C', keyCode: 67 },
  { key: 'v', shift: 'V', keyCode: 86 },
  { key: 'b', shift: 'B', keyCode: 66 },
  { key: 'n', shift: 'N', keyCode: 78 },
  { key: 'm', shift: 'M', keyCode: 77 },
  { key: ',', shift: '<', keyCode: 188 },
  { key: '.', shift: '>', keyCode: 190 },
  { key: '/', shift: '?', keyCode: 191 },
  { key: '▲', keyCode: 38, class: 'arrow-up' },
  { key: 'Shift', keyCode: 16, location: 'rigt', class: 'shift-right' },
  { key: 'Ctrl', keyCode: 17, location: 'left', class: 'ctrl' },
  { key: 'Win', keyCode: '', class: 'win' },
  { key: 'Alt', keyCode: 18, location: 'left', class: 'alt' },
  { key: 'Space', keyCode: 32, class: 'space' },
  { key: 'Alt', keyCode: 18, location: 'rigt', class: 'alt' },
  { key: '◄', keyCode: 37, class: 'arrow-left' },
  { key: '▼', keyCode: 40, class: 'arrow-down' },
  { key: '►', keyCode: 39, class: 'arrow-right' },
  { key: 'Ctrl', keyCode: 17, location: 'rigt', class: 'ctrl' },
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
    button.dataset.keycode = key.keyCode
    if (key.shift) {
      button.dataset.shift = key.shift
    }
    keysContainer.appendChild(button)
  }
  return keysContainer
}

// Create a function to handle pressing buttons
function handleKeys(e) {
  const key = e.target.dataset.keycode
  const shift = e.shiftKey
  if (key) {
    const event = new KeyboardEvent('keydown', { keyCode: shift ? e.target.dataset.shift.charCodeAt() : key })
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

// Add cymbos by keyboard
document.addEventListener('keydown', function (event) {
  if (event.key) {
    console.log(event.key)
    textArea.value += event.key
  }
})
