import { useState, useEffect, useRef } from 'react'
import * as Tone from 'tone'

import kick from "assets/sounds/Kick.wav"
import clap from "assets/sounds/Clap.wav"
import hh from "assets/sounds/HH.wav"
import casta from "assets/sounds/Cowbell.wav"

export default function useSounds () {
  const mySampler = useRef(null)

  const [isKickPlayed, isKickPlayedChange] = useState(false)
  const [isClaplayed, isClaplayedChange] = useState(false)
  const [isHhPlayed, isHhPlayedChange] = useState(false)
  const [isCastaPlayed, isCastaPlayedChange] = useState(false)

  useEffect(() => {
    const sampler = new Tone.Sampler({
      C4: kick,
      "D#4": clap,
      "F#4": hh,
      A4: casta,
    }).toDestination()

    Tone.loaded().then(() => {
      mySampler.current = sampler
    })
  }, [])

  function soundPlay (note) {
    mySampler.current.triggerAttackRelease([note], 4)
  }

  function handleKeyDown ({ key }) {
    switch (key) {
      case "a":
        isKickPlayedChange(true)
        window.setTimeout(() => isKickPlayedChange(false), 300)
        soundPlay("C4")
        break
      case "z":
        isClaplayedChange(true)
        window.setTimeout(() => isClaplayedChange(false), 300)
        soundPlay("D#4")
        break
      case "e":
        isHhPlayedChange(true)
        window.setTimeout(() => isHhPlayedChange(false), 300)
        soundPlay("F#4")
        break
      case "r":
        isCastaPlayedChange(true)
        window.setTimeout(() => isCastaPlayedChange(false), 300)
        soundPlay("A4")
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function handleSampleChange (note, file) {
    let fileURL = URL.createObjectURL(file)
    let buffer = new Tone.Buffer(fileURL)

    mySampler.current.add(note, buffer, () => {
      alert("Sample successfully changed")
    })
  }

  const buttonsList = [
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isKickPlayed,
      id: "kick",
      handleSampleChange: (event) => handleSampleChange("C4", event.target.files[0])
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isClaplayed,
      id: "clap",
      handleSampleChange: (event) => handleSampleChange("D#4", event.target.files[1])
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isHhPlayed,
      id: "hh",
      handleSampleChange: (event) => handleSampleChange("F#4", event.target.files[2])
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isCastaPlayed,
      id: "casta",
      handleSampleChange: (event) => handleSampleChange("A4", event.target.files[3])
    }
  ]

  return { buttonsList }
}