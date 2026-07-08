"use client"

import { MarkdownInput } from "sanity-plugin-markdown"
import { PatchEvent, set, type StringInputProps } from "sanity"
import { useEffect, useMemo } from "react"
import { portableTextToMarkdown } from "../lib/portable-text-to-markdown"

export function SafeMarkdownInput(props: StringInputProps) {
  const { value, onChange } = props

  const stringValue = useMemo(() => {
    if (typeof value === "string") return value
    if (value == null) return ""
    return portableTextToMarkdown(value)
  }, [value])

  useEffect(() => {
    if (typeof value !== "string" && value != null) {
      onChange(PatchEvent.from(set(stringValue)))
    }
  }, [value, stringValue, onChange])

  return <MarkdownInput {...props} value={stringValue} />
}
