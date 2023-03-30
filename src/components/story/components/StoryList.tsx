import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import ItemCard from './ItemCard';

interface StoryListProps {
    info: any;
    onEndReached: any;
    onRefresh: any;
    refreshing: boolean;
    navigation: any;
    page: number;
}

const StoryList = ({ info, onEndReached, onRefresh, refreshing, navigation, page }: StoryListProps) => {
    return (
        <>
            <FlatList
                data = {info}
                renderItem = {({item}) => (
                    <ItemCard
                        id = {item.id}
                        rep_pic = {item.rep_pic}
                        place_name = {item.place_name}
                        title = {item.title}
                        category = {item.category}
                        story_like = {item.story_like}
                        preview = {item.preview}
                        navigation = {navigation}
                    />
                )}
                keyExtractor = {(item, index) => String(index)}
                onRefresh = {onRefresh}
                refreshing = {refreshing}
                onEndReached = {onEndReached}
                showsVerticalScrollIndicator = {true}
                ListEmptyComponent = {<Text style = {{ marginTop: 15}}>해당하는 스토리가 없습니다</Text>}
            />
        </>
    )
}

export default StoryList;