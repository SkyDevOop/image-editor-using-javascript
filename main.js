// Filltre
let saturate = document.getElementById('saturate')
let contrast = document.getElementById('contrast')
let brightness = document.getElementById('brightness')
let sepia = document.getElementById('sepia')
let grayscale = document.getElementById('grayscale')
let blur = document.getElementById('blur')
let hue_rotate = document.getElementById('hue_rotate')
// download ,Rest, img__upload buttons
let download = document.getElementById('download')
let btn__rest = document.getElementById('btn__rest')
let img__upload = document.getElementById('img__upload')
// box-img
let img__box = document.querySelector('.img__box')
let img_S = document.getElementById('img__selected')
let container = document.querySelector('.container')
let img = document.querySelector('.img')
// Get canvas element
let canvas =  document.getElementById('canvas')
let ctx = canvas.getContext('2d')
// Step 1 Rest remove button (download, Rest , Upload)
window.onload = () => {
  download.style.display = 'none'
  btn__rest.style.display = 'none'
}
// fuction drawImange in canvas
let drawImage = () => {
   canvas.width = img_S.width
   canvas.height = img_S.height
   ctx.drawImage(img_S,0,0,canvas.width, canvas.height)
   img_S.style.display = 'none'
}
// rest Drop dragover dragenter
window.addEventListener('drop', (eo) => {
  eo.preventDefault()
})
window.addEventListener('dragenter', (eo) => {
  eo.preventDefault()
})
window.addEventListener('dragover', (eo) => {
  eo.preventDefault()
})
// fuction drop img
let upload__img = (e) => {
  rest__filter()
  download.style.display = 'block'
  btn__rest.style.display = 'block'
  let file = new FileReader();
  file.readAsDataURL(e[0])
  file.onload = () => {
    img_S.src = file.result
  }
}
container.addEventListener('drop', (eo) => {
  console.log('good')
  eo.preventDefault();
  eo.stopPropagation()
  upload__img(eo.dataTransfer.files)
  img.classList.remove('drop-background')
     img_S.onload =  () => { 
    drawImage()
  }
}, false)
container.addEventListener('dragenter', (eo) => {
  eo.preventDefault()
  img.classList.add('drop-background')
})
container.addEventListener('dragleave', (eo) => {
  eo.preventDefault()
  img.classList.remove('drop-background')
})
//  Upload img And Set in img__box
img__upload.addEventListener('change', (e) => {
  download.style.display = 'block'
  btn__rest.style.display = 'block'
  rest__filter()
  // Method One
  // let file = e.target.files[0]; 
  // let src = URL.createObjectURL(file)
  // img_S.setAttribute("src", src);
  // console.log(img_S.src)
  // Method Tow
  let file = new FileReader();
  file.readAsDataURL(e.target.files[0])
  file.onload = () => {
    img_S.src = file.result
  }
   img_S.onload =  () => { 
    drawImage()
  }
})

// add filltre in img
let all__filter = document.querySelectorAll(".filltre ul li input")
let likeArrayToArray = Array.from(all__filter)

likeArrayToArray.forEach(filter => {
  filter.addEventListener('input', () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hue_rotate.value}deg)
      `
    ctx.drawImage(img_S,0,0,canvas.width, canvas.height)
  })
});
// Btn Rest fillter
let rest__filter = () => {
  ctx.filter = `
  saturate(100%)
  contrast(100%)
  brightness(100%)
  sepia(0%)
  grayscale(0)
  blur(0px)
  hue-rotate(0deg)
  `
  ctx.drawImage(img_S,0,0,canvas.width, canvas.height)
  saturate.value = '100%';
  contrast.value = '100%';
  brightness.value = '100%';
  sepia.value = '0';
  grayscale.value = '0';
  blur.value = '0';
  hue_rotate.value = '0';
}
btn__rest.addEventListener('click', () => {
  rest__filter()
})
// Download Img
download.addEventListener('click', () => {
  download.href = canvas.toDataURL()
  console.log('done')
})