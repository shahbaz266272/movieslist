import { View, Text, TouchableOpacity, Image, Alert } from "react-native"

import styles from "./nearbyjobcard.style"
import { checkImageURL } from "../../../../utils"
import { Rating } from "react-native-elements"
import Swipeout from "react-native-swipeout"
import AsyncStorage from "@react-native-async-storage/async-storage"

const NearbyJobCard = ({ job, handleNavigate, onDelete }) => {
  const deleteNote = async () => {
    await AsyncStorage.removeItem(job?.id?.toString())
    onDelete()
  }
  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your Movie permanently!",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteNote()
            // Trigger the onDelete function passed from the parent
          },
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const swipeoutBtns = [
    {
      text: "Delete",
      backgroundColor: "red",
      style: { borderRadius: 10 },
      onPress: displayDeleteAlert,
    },
  ]
  return (
    <Swipeout right={swipeoutBtns} autoClose={true} backgroundColor="#fff">
      <TouchableOpacity style={styles.container} onPress={handleNavigate}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{
              uri:
                job.image ||
                "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            style={styles.logImage}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            {job?.title}
          </Text>

          <Text style={styles.jobType}>
            <Rating
              type="heart"
              readonly
              ratingCount={5}
              startingValue={job.ratings}
              imageSize={20}
              ratingColor={`#f4511e`}
            />
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeout>
  )
}

export default NearbyJobCard
