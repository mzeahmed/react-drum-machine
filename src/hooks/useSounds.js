import * as Tone from 'tone'
import { useState, useEffect, useRef } from 'react'

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
      "C4": kick,
      "D#4": clap,
      "F#4": hh,
      "A4": casta,
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

  const buttonsList = [
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isKickPlayed
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isClaplayed
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isHhPlayed
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isCastaPlayed
    }
  ]

  return { buttonsList }
}