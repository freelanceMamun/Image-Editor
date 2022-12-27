const fileInput = document.querySelector('.file-input');
const ChooseImage = document.querySelector('.choose-img');
const PreviewImgae = document.querySelector('.preview-img img');
const filteOptions = document.querySelectorAll('.filter button'),
  filterName = document.querySelector('.filter-info .name'),
  filterSlider = document.querySelector('.slider input'),
  filterValue = document.querySelector('.filter-info .value');
const rotatOptions = document.querySelectorAll('.rotate button');
const resetFilterButton = document.querySelector('.reset-filter');
const saveImage = document.querySelector('.save-img');
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  PreviewImgae.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical}) `;
  PreviewImgae.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  PreviewImgae.src = URL.createObjectURL(file);
  PreviewImgae.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('disable');
  });
};

filteOptions.forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelector('.filter .active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;
    if (option.id === 'Brightness') {
      filterSlider.max = '200';
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === 'Saturation') {
      filterSlider.max = '200';
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === 'Inversion') {
      filterSlider.max = '100';
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = '100';
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFitlter = document.querySelector('.filter .active');
  if (selectedFitlter.id === 'Brightness') {
    brightness = filterSlider.value;
  } else if (selectedFitlter.id === 'Saturation') {
    saturation = filterSlider.value;
  } else if (selectedFitlter.id === 'Inversion') {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotatOptions.forEach((option) => {
  option.addEventListener('click', function () {
    console.log(option);
    if (option.id === 'left') {
      rotate -= 90;
    } else if (option.id === 'right') {
      rotate += 90;
    } else if (option.id === 'horizontal') {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const restFilter = () => {
  (brightness = 100), (saturation = 100), (inversion = 0), (grayscale = 0);
  (rotate = 0), (flipHorizontal = 1), (flipVertical = 1);
  filteOptions[0].click();
  applyFilters();
};
const SaveImage = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = PreviewImgae.naturalWidth;
  canvas.height = PreviewImgae.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);

  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    PreviewImgae,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement('a');
  link.download = 'image.jpg';
  link.href = canvas.toDataURL();
  link.click();
};

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
resetFilterButton.addEventListener('click', restFilter);
saveImage.addEventListener('click', SaveImage);
ChooseImage.addEventListener('click', () => {
  fileInput.click();
});
