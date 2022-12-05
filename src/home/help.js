import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';

export default function Help({ route, navigation }){
  var base = new Base()

  useEffect(() => {
    base.set_white_status_bar()

    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        
        navigation.goBack()
        return true
      })
    });

    return unsubscribe;
  }, [])

  return (
    <View style={{  flex: 1 }}>
      <CustomNavigation
        style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5,  }}
        title={base.i18n.t("help")}
        text_color={base.color.black}
        navigation={navigation}/>

      <ScrollView>
        <View style={{ padding: base.size.size_3, }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold', color: base.color.primary, }}>Transaksi Peminjaman Buku</Text>
              <View style={{ flex: 1, backgroundColor: base.color.grey1, height: base.size.border1, marginLeft: base.size.size_3, }}></View>
            </View>

            <View style={{ marginTop: base.size.title, }}>
              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 1</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Kamu dapat melihat buku pada koleksi yang ada dihalaman Beranda atau kamu dapat juga mencarinya pada halaman Cari</Text>
                    <Text style={{ marginTop: base.size.size_3 }}>Pada detail buku tersebut kamu dapat melihat informasi buku, jumlah eksemplar, berapa eksemplar yang tersedia ataupun tidak</Text>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 2</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Jika terdapat eksemplar yang tersedia maka kamu dapat meminjam buku tersebut dengan mengklik Tambah Keranjang maka buku tersebut dengan eksemplar yang tersedia akan dimasukkan ke keranjang kamu dan kamu langsung akan diarahkan ke halaman keranjang.</Text>
                    <Text style={{ marginTop: base.size.size_3 }}>Pada halaman Keranjang kamu akan dapat melihat buku apa saja yang kamu telah masukkan keranjang dan kamu dapat juga menghapus buku yang tidak jadi kamu pinjam dengan menggesernya kekiri lalu klik ikon kotak sampah untuk menghapus buku tersebut.</Text>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 3</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Jika ingin melakukan proses peminjaman maka klik lanjut pada halaman Keranjang tersebut kamu akan diarahkan ke halaman Checkout yang berisikan Informasi Peminjam dan Daftar Buku yang akan dipinjam lalu klik Pesan jika ingin melanjutkan kepeminjaman tunggu hingga proses peminjaman berhasil maka kamu akan mendapatkan tampilan Transaksi Berhasil dan ada No Transaksi.</Text>
                    <Text style={{ marginTop: base.size.size_3 }}>Sebelumnya kamu juga dapat membatalkan Peminjaman melalui aplikasi yang berada pada halaman Pesanan dan pilih pesanan kamu lalu klik Batalkan Pesanan.</Text>
                  </View>
                </View>
              </CustomCard>
              
              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 4</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Setelah proses peminjaman diaplikasi berhasil kamu dapat melakukan konfirmasi dengan datang langsung keDinas Perpustakaan Daerah dengan menunjukkan No Transaksi dan Buku yang dipinjam kepada Petugas agar Petugas dapat mengkonfirmasi peminjaman kamu.</Text>
                  </View>
                </View>
              </CustomCard>
            </View>
          </View>

          <View style={{ marginTop: base.size.toolbar, marginBottom: base.size.toolbar, }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold', color: base.color.primary, }}>Pengembalian Buku</Text>
              <View style={{ flex: 1, backgroundColor: base.color.grey1, height: base.size.border1, marginLeft: base.size.size_3, }}></View>
            </View>

            <View style={{ marginTop: base.size.title, }}>
              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}>
                <View>
                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Kamu datang ke Dinas Perpustakaan Daerah dengan membawa buku yang dipinjam.</Text>
                    <Text style={{ marginTop: base.size.size_3 }}>Lalu kamu berikan kepada Petugas agar petugas dapat mengkonfirmasi Pengembalian buku tersebut</Text>
                  </View>
                </View>
              </CustomCard>
              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
