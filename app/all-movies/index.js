import { View, Text } from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import Onboarding from "react-native-onboarding-swiper"
import { Image } from "react-native"
import tw from "twrnc"
import { images } from "../../constants"
import { StatusBar } from "expo-status-bar"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNotes } from "../../contexts/NoteProvider"

export default function OnboardingScreen() {
  const router = useRouter()

  const { notes, setNotes } = useNotes()
  const [yes, setyes] = useState(null)
  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched")
      setyes(appData)
      console.log("yes", appData)
    }
    setData()
  }, [])
  return (
    <>
      <StatusBar hidden={true} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Onboarding
        onDone={() => {
          setyes("false")
          router.push("/")
          AsyncStorage.setItem("appLaunched", "false")
          setNotes({ callapi: Math.random() })
        }}
        showSkip={false}
        nextLabel={<Image source={require("../../assets/icons/btn2.png")} />}
        bottomBarHighlight={false}
        imageContainerStyles={{ paddingBottom: 0 }}
        bottomBarHeight={60}
        pages={[
          {
            backgroundColor: "#f4511e",
            image: <Image source={require("../../assets/bg1.png")} />,
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "#f4511e",
            image: <Image source={images.bg2} />,
            title: "",
            subtitle: "",
          },
        ]}
      />
    </>
  )
}
