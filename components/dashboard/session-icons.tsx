import type { IconType } from "react-icons"
import {
  FaAndroid,
  FaApple,
  FaChrome,
  FaDesktop,
  FaEdge,
  FaFirefoxBrowser,
  FaLaptop,
  FaLinux,
  FaMobileAlt,
  FaOpera,
  FaQuestionCircle,
  FaSafari,
  FaTabletAlt,
  FaTv,
  FaWindows,
} from "react-icons/fa"
import {
  SiArchlinux,
  SiBrave,
  SiCentos,
  SiDebian,
  SiDuckduckgo,
  SiFedora,
  SiGentoo,
  SiIos,
  SiManjaro,
  SiOpensuse,
  SiRedhat,
  SiSamsung,
  SiUbuntu,
  SiVivaldi,
} from "react-icons/si"
import { RiChromeLine } from "react-icons/ri"
import { LuWatch } from "react-icons/lu"

function normalize(value?: string) {
  return (value ?? "").trim().toLowerCase()
}

const osIcons: [string, IconType][] = [
  ["windows", FaWindows],
  ["mac os", FaApple],
  ["macos", FaApple],
  ["os x", FaApple],
  ["darwin", FaApple],
  ["ios", SiIos],
  ["ipados", FaApple],
  ["android", FaAndroid],
  ["chrome os", RiChromeLine],
  ["chromeos", RiChromeLine],
  ["chromium os", RiChromeLine],
  ["ubuntu", SiUbuntu],
  ["debian", SiDebian],
  ["fedora", SiFedora],
  ["arch", SiArchlinux],
  ["manjaro", SiManjaro],
  ["centos", SiCentos],
  ["red hat", SiRedhat],
  ["rhel", SiRedhat],
  ["opensuse", SiOpensuse],
  ["suse", SiOpensuse],
  ["gentoo", SiGentoo],
  ["linux", FaLinux],
  ["unix", FaLinux],
  ["harmony", FaAndroid],
  ["tizen", FaAndroid],
  ["kaios", FaMobileAlt],
  ["blackberry", FaMobileAlt],
]

const deviceIcons: [string, IconType][] = [
  ["laptop", FaLaptop],
  ["desktop", FaDesktop],
  ["mobile", FaMobileAlt],
  ["phone", FaMobileAlt],
  ["smartphone", FaMobileAlt],
  ["tablet", FaTabletAlt],
  ["ipad", FaTabletAlt],
  ["tv", FaTv],
  ["smarttv", FaTv],
  ["watch", LuWatch],
  ["wearable", LuWatch],
  ["console", FaTv],
]

const browserIcons: [string, IconType][] = [
  ["chrome", FaChrome],
  ["chromium", FaChrome],
  ["firefox", FaFirefoxBrowser],
  ["safari", FaSafari],
  ["edge", FaEdge],
  ["opera", FaOpera],
  ["brave", SiBrave],
  ["samsung", SiSamsung],
  ["duckduckgo", SiDuckduckgo],
  ["vivaldi", SiVivaldi],
  ["ios", SiIos],
  ["webview", FaMobileAlt],
]

function matchIcon(value: string | undefined, pairs: [string, IconType][]): IconType {
  const key = normalize(value)
  if (!key) {
    return FaQuestionCircle
  }

  const found = pairs.find(([name]) => key.includes(name))
  return found?.[1] ?? FaQuestionCircle
}

export function getOsIcon(os?: string) {
  return matchIcon(os, osIcons)
}

export function getDeviceIcon(device?: string) {
  return matchIcon(device, deviceIcons)
}

export function getBrowserIcon(browser?: string) {
  return matchIcon(browser, browserIcons)
}
