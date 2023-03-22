import React, { Dispatch, Ref, SetStateAction, useEffect } from 'react'
import { TouchableOpacity, ScrollView, Text, View, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Pagination from '../../common/Pagination';
import { Coordinate } from '../../pages/SpotMap';
import { detailDataProps } from './SpotDetail';
import ItemCard from './SpotList/ItemCard';

const ListSection = styled.View`
  background-color: #FFFFFF;
  height: 600px;
`
const PaginationSection = styled.View`
  height: 40px;
  display: flex;
  align-items: center;
`
type MapListProps = {
  detailRef: any;
  placeData: any[];
  page: number;
  total: number;
  setPage: (num: number) => void;
  setDetailData: Dispatch<SetStateAction<detailDataProps>>;
  setCenter: Dispatch<SetStateAction<Coordinate>>;
}

export type DataTypes = {
  address: string;
  category: string;
  id: number;
  place_name: string;
  place_review: string;
  rep_pic: string;
  open_hours: string;
  place_like: string;
}

export default function MapList({ detailRef, placeData, setPage, page, total, setDetailData, setCenter }: MapListProps): JSX.Element {
  return (
    <ListSection>
      <ScrollView>
        {
          placeData.map(data => {
            return (
              <ItemCard detailRef={detailRef} key={data.id} placeData={data} setDetailData={setDetailData} setCenter={setCenter} />
            )
          })
        }
        <PaginationSection>
          <Pagination page={page} setPage={setPage} total={total} limit={20}></Pagination>
        </PaginationSection>
      </ScrollView>
    </ListSection>
  )
}