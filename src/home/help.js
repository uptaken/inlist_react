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
        style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
        title={base.i18n.t("help")}
        text_color={base.color.white}
        navigation={navigation}/>

      <ScrollView>
        <View style={{ padding: base.size.size_3, }}>
          <View>
            <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold' }}>Transaksi Peminjaman Buku</Text>

            <View style={{ marginTop: base.size.size_1, }}>
              <Text>- Kamu dapat melihat buku pada koleksi yang ada dihalaman Beranda atau kamu dapat juga mencarinya pada halaman Cari</Text>
              <Text>- Pada detail buku tersebut kamu dapat melihat informasi buku, jumlah eksemplar, berapa eksemplar yang tersedia ataupun tidak</Text>
              <Text>- Jika terdapat eksemplar yang tersedia maka kamu dapat meminjam buku tersebut dengan mengklik Tambah Keranjang maka buku tersebut dengan eksemplar yang tersedia akan dimasukkan ke keranjang kamu dan kamu langsung akan diarahkan ke halaman keranjang.</Text>
              <Text>- Pada halaman Keranjang kamu akan dapat melihat buku apa saja yang kamu telah masukkan keranjang dan kamu dapat juga menghapus buku yang tidak jadi kamu pinjam dengan menggesernya kekiri lalu klik ikon kotak sampah untuk menghapus buku tersebut.</Text>
              <Text>- Jika ingin melakukan proses peminjaman maka klik lanjut pada halaman Keranjang tersebut kamu akan diarahkan ke halaman Checkout yang berisikan Informasi Peminjam dan Daftar Buku yang akan dipinjam lalu klik Pesan jika ingin melanjutkan kepeminjaman tunggu hingga proses peminjaman berhasil maka kamu akan mendapatkan tampilan Transaksi Berhasil dan ada No Transaksi.</Text>
              <Text>- Sebelumnya kamu juga dapat membatalkan Peminjaman melalui aplikasi yang berada pada halaman Pesanan dan pilih pesanan kamu lalu klik Batalkan Pesanan.</Text>
              <Text>- Setelah proses peminjaman diaplikasi berhasil kamu dapat melakukan konfirmasi dengan datang langsung keDinas Perpustakaan Daerah dengan menunjukkan No Transaksi dan Buku yang dipinjam kepada Petugas agar Petugas dapat mengkonfirmasi peminjaman kamu.</Text>
            </View>
          </View>

          <View style={{ marginTop: base.size.size_5 }}>
            <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold' }}>Pengembalian Buku</Text>

            <View style={{ marginTop: base.size.size_1, }}>
              <Text>- Kamu datang ke Dinas Perpustakaan Daerah dengan membawa buku yang dipinjam.</Text>
              <Text>- Lalu kamu berikan kepada Petugas agar petugas dapat mengkonfirmasi Pengembalian buku tersebut</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
