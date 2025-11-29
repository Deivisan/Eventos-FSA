/**
 * Middleware de Upload de Arquivos
 */

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Tipos permitidos
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  video: ['video/mp4', 'video/webm']
};

// Configuração de storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'misc';
    
    if (ALLOWED_TYPES.image.includes(file.mimetype)) {
      folder = 'images';
    } else if (ALLOWED_TYPES.audio.includes(file.mimetype)) {
      folder = 'audio';
    } else if (ALLOWED_TYPES.video.includes(file.mimetype)) {
      folder = 'video';
    }
    
    cb(null, path.join(__dirname, `../../uploads/${folder}`));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  const allAllowed = [
    ...ALLOWED_TYPES.image,
    ...ALLOWED_TYPES.audio,
    ...ALLOWED_TYPES.video
  ];
  
  if (allAllowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido'), false);
  }
};

// Configuração do Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE) || 5 * 1024 * 1024 // 5MB
  }
});

// Uploads específicos
const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.image.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = {
  upload,
  uploadImage,
  ALLOWED_TYPES
};
