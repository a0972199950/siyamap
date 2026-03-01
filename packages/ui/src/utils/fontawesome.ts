import { config } from '@fortawesome/fontawesome-svg-core'

// 防止 FontAwesome 自動添加 CSS（我們會手動匯入）
config.autoAddCss = false

// 導出常用圖標以便於使用
export {
  faApple,
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
  faMicrosoft,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
export {
  faCalendar as faCalendarRegular,
  faClock as faClockRegular,
  faComments as faCommentsRegular,
  faEnvelope as faEnvelopeRegular,
  faFile as faFileRegular,
  faFolder as faFolderRegular,
  faHeart as faHeartRegular,
  faStar as faStarRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons'
export {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowRightToBracket,
  faArrowUp,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCog,
  faDownload,
  faEdit,
  faEnvelope,
  faExternalLinkAlt,
  faEye,
  faEyeSlash,
  faHeart,
  faHome,
  faMapMarkerAlt,
  faMinus,
  faPhone,
  faPlus,
  faSearch,
  faShare,
  faSpinner,
  faStar,
  faTimes,
  faTrash,
  faUpload,
  faUser} from '@fortawesome/free-solid-svg-icons'
