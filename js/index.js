const $input = document.querySelector('#text_input')

const $buttonEncrypt = document.querySelector('#button_encrypt')

const $buttonDecrypt = document.querySelector('#button_decrypt')

const $decryptSection = document.querySelector('#decrypt_section')

const $noTextMessage = document.querySelector('#no_text_message')

const $buttonCopy = document.querySelector('#button_copy')

const $p = document.querySelector('#text_output')

const $outputTextContainer = document.querySelector('#output_text_container')

const Hash = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
}

const reverseHash = {}

Object.entries(Hash).forEach(([key, value]) => {
    reverseHash[value] = key
})

$input.addEventListener('input', (event) => {
    if (!event?.target?.value) {
        $outputTextContainer.style.display = 'none'
        $noTextMessage.style.display = 'block'
    }
})

$buttonEncrypt.addEventListener('click', (e) => {
    if (!($input instanceof HTMLTextAreaElement)) {
        return alert('Error: $input is not an HTMLTextAreaElement')
    }
    const text = $input.value.toLocaleLowerCase()
    
    const textEncrypted = text.replace(/([aeiou])/g, (match) => Hash[match])

    $p.innerText = textEncrypted
    
    $noTextMessage.style.display = 'none'
    
    $outputTextContainer.style.display = 'block'
})

const regexHash = new RegExp(Object.keys(reverseHash).join('|'), 'g')

$buttonDecrypt.addEventListener('click', (e) => {
    if (!($input instanceof HTMLTextAreaElement)) {
        return alert('Error: $input is not an HTMLTextAreaElement')
    }
    
    const text = $input.value.toLocaleLowerCase()
    
    const textEncrypted = text.replace(regexHash, (match) => reverseHash[match])

    $p.innerText = textEncrypted
    
    $noTextMessage.style.display = 'none'

    $outputTextContainer.style.display = 'block'
    
    alert(textEncrypted)
})


$buttonCopy.addEventListener('click', async () => {
    const text = $p.innerHTML
    if (text) {
        navigator.clipboard.writeText(text)
        alert('Texto copiado')
    } else {
        alert('No hay texto para copiar')
    }
})