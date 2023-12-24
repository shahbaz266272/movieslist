import React, { useEffect, useState } from "react"
import {
  View,
  ScrollView,
  SafeAreaView,
  Button,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import { COLORS, icons, images, SIZES } from "../../constants"
import tw from "twrnc"
import DateTimePicker from "react-native-ui-datepicker"
import { Rating } from "react-native-elements"
import * as ImagePicker from "expo-image-picker"
import { Image } from "react-native"
import { ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNotes } from "../../contexts/NoteProvider"

const Addjob = () => {
  const router = useRouter()
  const { notes, setNotes } = useNotes()
  const [value, setValue] = useState(new Date())
  const [isLoading, setisLoading] = useState(false)
  const [movieform, setmovieform] = useState({
    title: "",
    date: "",
    genre: "",
    actors: "",
    reviews: "",
    image: "",
  })
  const [ratings, setratings] = useState(4)
  const AddMovie = () => {
    setisLoading(true)
    if (
      (movieform?.title === "",
      movieform?.date === "",
      movieform?.genre === "",
      movieform?.actors === "",
      movieform?.reviews === "",
      movieform?.image === "")
    ) {
      alert("Insert Data in All Fields")
      setisLoading(false)
    } else {
      AsyncStorage.setItem(
        Math.random().toString(),
        JSON.stringify({
          title: movieform?.title,
          date: movieform?.date,
          genre: movieform?.genre,
          actors: movieform?.actors,
          reviews: movieform?.reviews,
          image: movieform?.image,
          ratings: ratings,
        })
      )
        .then((_res) => {
          alert("Movie Added Successfully!")

          setisLoading(false)
          // router.back()
          setNotes({ callapi: Math.random() })
          router.push(`/`)
        })
        .catch((err) => {
          alert(err)

          setisLoading(false)
        })
    }
  }
  const ratingCompleted = (rating) => {
    setratings(rating)
  }

  const [image, setImage] = useState(null)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setmovieform({
        ...movieform,
        image: result.assets[0].uri,
      })
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "Add New Movie",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`p-4 flex flex-col gap-2`}>
            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Image *</Text>
            <TouchableOpacity onPress={pickImage}>
              <Image source={icons.gallery} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Title *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#f4511e]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  title: text,
                })
              }
              placeholder="title"
              placeholderTextColor="#AEAEAE"
            />
            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>
              Release Date *
            </Text>
            <Text>
              <DateTimePicker
                mode="date"
                value={movieform?.date}
                onValueChange={(date) =>
                  setmovieform({
                    ...movieform,
                    date: new Date(date),
                  })
                }
              />{" "}
            </Text>
            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Genre *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#f4511e]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  genre: text,
                })
              }
              value={movieform?.genre}
              placeholder="genre"
              placeholderTextColor="#AEAEAE"
            />
            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Actors *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#f4511e]`}
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  actors: text,
                })
              }
              value={movieform?.actors}
              placeholder="actors"
              placeholderTextColor="#AEAEAE"
            />
            <Text style={tw`text-red-400 font-bold  text-sm mb-2`}>
              Sepearte each name by coma e.g john,smith *
            </Text>

            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Ratings *</Text>
            <Text>
              <Rating
                type="heart"
                ratingCount={5}
                startingValue={ratings}
                imageSize={60}
                onFinishRating={ratingCompleted}
                ratingColor={`#f4511e`}
              />
            </Text>
            <Text style={tw`text-[#f4511e] font-bold  text-lg`}>Reviews *</Text>
            <TextInput
              style={tw`bg-slate-200 rounded-lg p-2 text-[#f4511e]`}
              multiline
              onChangeText={(text) =>
                setmovieform({
                  ...movieform,
                  reviews: text,
                })
              }
              value={movieform?.reviews}
              placeholder="reviews"
              placeholderTextColor="#AEAEAE"
            />

            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <TouchableOpacity
                disabled={isLoading}
                style={tw`bg-[#f4511e] rounded-lg py-2 mt-3`}
                onPress={AddMovie}
              >
                <Text style={tw`text-white text-center text-lg`}>
                  Add Movie
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Addjob
