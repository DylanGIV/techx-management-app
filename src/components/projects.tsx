import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsByAccount } from '../redux/actions/ProjectActions';

const FavoritesScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProjectsByAccount())
    }, [])
    const projects = useSelector((state : any) => state.project.projects);

    

    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
          <View style={styles.wrapperView}>
            
          <Animated.FlatList
            onScrollBeginDrag={() => setToggleSearchBar(false)}
            keyExtractor={(item) => item.id}
            // style={{ transform: [{ translateY: searchBarAnim }] }}
            // style={{ transform: [{ translateY: searchBarAnim }] }}
            data={filteredRestaurants}
            onRefresh={onSearch}
            refreshing={refreshStart}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: theme.colors.primary }}>
                <Card style={(styles.card, styles.spacing)}>
                  <Card.Content>
                    <Title>{item.name}</Title>
                  </Card.Content>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("RestaurantDetails", {
                        name: item.name,
                        restaurant: item,
                      })
                    }
                  >
                    <Card.Cover
                      source={{ uri: item.image_url ? item.image_url : null }}
                    />
                  </TouchableOpacity>
                  <Card.Actions style={styles.actionContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginRight: 40,
                          // backgroundColor: "grey",
                        }}
                      >
                        <View
                          style={{
                            marginRight: 20,
                            marginLeft: 10,
                            padding: 10,
                          }}
                        >
                          <TouchableOpacity
                            style={
                              (styles.buttonContainer,
                              {
                                borderWidth: 2,

                                backgroundColor: theme.colors.primary,
                                borderRadius: 20,
                                borderColor: theme.colors.primary,
                              })
                            }
                          >
                            <IconButton
                              icon="phone"
                              color={theme.colors.background}
                              onPress={() => CallNum(item.display_phone)}
                            >
                              {/* <Icon
                          style={{ color: theme.colors.background }}
                          name="phone"
                          size={19}

                        /> */}
                            </IconButton>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginLeft: 20,
                            marginRight: 10,
                            padding: 10,
                          }}
                        >
                          <TouchableOpacity
                            style={
                              (styles.buttonContainer,
                              {
                                borderWidth: 2,
                                borderRadius: 20,
                                backgroundColor: theme.colors.primary,
                                borderColor: theme.colors.primary,
                              })
                            }
                          >
                            <IconButton
                              onPress={() =>
                                openMap({
                                  end: (item.location.address1 + ", " + item.location.city),
                                })
                              }
                              color={theme.colors.background}
                              icon="directions"
                            ></IconButton>
                          </TouchableOpacity>
                        </View>
                        {/* need to move  */}
                        <View
                          style={
                            (styles.buttonContainer,
                            { backgroundColor: theme.colors.primary })
                          }
                        ></View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center",
                        }}
                      >
                        <Rating
                          type="custom"
                          // defaultValue={item.rating}
                          imageSize={20}
                          startingValue={item.rating}
                          ratingBackgroundColor={theme.colors.surface}
                          tintColor={theme.colors.background}
                          ratingColor={theme.colors.primary}
                          ratingCount={5}
                          unSelectedColor="black"
                          readonly
                        />
                      </View>
                    </View>
                  </Card.Actions>
                </Card>
              </View>
            )}
          />
        )}



          </View>
      </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },

  });
    
export default FavoritesScreen;
