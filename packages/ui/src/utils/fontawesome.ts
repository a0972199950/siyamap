import { config } from '@fortawesome/fontawesome-svg-core';

// 防止 FontAwesome 自動添加 CSS（我們會手動匯入）
config.autoAddCss = false;

// 導出常用圖標以便於使用
export {
  faHome,
  faUser,
  faSearch,
  faHeart,
  faStar,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faCheck,
  faTimes,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCog,
  faSpinner,
  faEye,
  faEyeSlash,
  faDownload,
  faUpload,
  faShare,
  faExternalLinkAlt,
  faArrowRightToBracket
} from '@fortawesome/free-solid-svg-icons';

export {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
  faUser as faUserRegular,
  faEnvelope as faEnvelopeRegular,
  faComments as faCommentsRegular,
  faFile as faFileRegular,
  faFolder as faFolderRegular,
  faCalendar as faCalendarRegular,
  faClock as faClockRegular,
} from '@fortawesome/free-regular-svg-icons';

export {
  faGithub,
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
  faGoogle,
  faApple,
  faMicrosoft,
} from '@fortawesome/free-brands-svg-icons';
