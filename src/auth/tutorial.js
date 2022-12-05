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
  BackHandler,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';

export default function Tutorial({ route, navigation }){
  var base = new Base()

  return (
    <View style={{ flex: 1 }}>
      <CustomNavigation
        style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, marginTop: base.size.large_title, }}
        title={base.i18n.t("tutorial")}
        navigation={navigation}
        padding={base.size.size_5}/>

      <ScrollView>
        <View style={{ padding: base.size.size_3, }}>
          <View style={{  }}>

            <View style={{  }}>
              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}>
                <View>
                  <Text style={{ color: base.color.primary, fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 1</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Klik tombol Daftar yang terdapat pada bagian bawah Lalu akan diarahkan ke halaman berisikan informasi ketentuan sebelum melakukan pendaftaran sebagai anggota</Text>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ color: base.color.primary, fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 2</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Lalu klik Daftar untuk melanjutkan pendaftaran dan akan diarahkan ke halaman baru untuk mengisikan form-form yang ada seperti dibawah</Text>
                    <View style={{ marginLeft: base.size.size_3, }}>
                      <Text>o Nama Lengkap *</Text>
                      <Text>o Alamat Email *</Text>
                      <Text>o Tipe Identitas *</Text>
                      <Text>o No Identitas *</Text>
                      <Text>o Jenis Kelamin *</Text>
                      <Text>o Jenis Anggota *</Text>
                    </View>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ color: base.color.primary, fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 3</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Lalu jika semua form telah terisi klik tombol lanjut lalu akan diarahkan kehalaman pendaftaran baru untuk mengisikan form-form yang ada seperti dibawah</Text>
                    <View style={{ marginLeft: base.size.size_3, }}>
                      <Text>o Alamat Tinggal *</Text>
                      <Text>o Provinsi *</Text>
                      <Text>o Kota *</Text>
                      <Text>o Kecamatan *</Text>
                      <Text>o Kelurahan *</Text>
                      <Text>o RT *</Text>
                      <Text>o RW *</Text>
                      <Text>o Lalu centang pada checkbox “Alamat tinggal sama dengan alamat identitas”</Text>
                      <Text>Note : Jika kamu mencentang “Alamat tinggal sama dengan alamat identitas” maka ketika kamu mengklik lanjut kamu akan diarahkan keform pendaftaran selanjutnya yaitu “Detail Alamat” akan tetapi jika tidak maka kamu akan diarahkan ke form yang sama seperti sebelumnya yakni Alamat Identitas dengan bentuk from yang sama seperti diatas.</Text>
                    </View>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ color: base.color.primary, fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 4</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Pada form pendaftaran selanjutnya kamu akan mengisikan form-form seperti dibawah</Text>
                    <View style={{ marginLeft: base.size.size_3, }}>
                      <Text>o No. Telp Rumah</Text>
                      <Text>o Nomor HP *</Text>
                      <Text>o Nama Institusi</Text>
                      <Text>o Alamat Institusi</Text>
                      <Text>o Telpon Institusi</Text>
                      <Text>o Lalu centang pada checkbox “Saya menyatakan data yang diisi benar dan dapat dipertanggungjawabkan” *</Text>
                    </View>
                  </View>
                </View>
              </CustomCard>

              <CustomCard
                color={base.color.grey1}
                on_press={() => {}}
                borderColor={base.color.grey1}
                style={{ marginTop: base.size.size_3 }}>
                <View>
                  <Text style={{ color: base.color.primary, fontWeight: 'bold', fontSize: base.size.size_5, }}>Tahap 5</Text>

                  <View style={{ marginTop: base.size.size_3 }}>
                    <Text>Lalu pada Langkah pendaftaran terakhir kamu akan diminta untuk memasukkan foto yang akan menjadi foto profile anggota kamu kamu dapat mengambil gambar dari galeri ataupun kamera kamu, jika kamu telah berhasil mengunggah foto kamu maka kamu dapat mengklik lanjut untuk melanjutkan proses pendaftaran tunggu sampai aplikasi memproses pendaftaran kamu jika berhasil maka kamu akan diberikan halaman yang menunjukkan pendaftaran kamu berhasil dan tampilan kartu anggota kamu</Text>
                    <Text style={{ marginTop: base.size.size_3 }}>Klik “Mulai berselancar” maka kamu akan diarahkan ke halaman login dan kamu dapat login dengan email dan password yang telah kamu daftarkan sebelumnya.</Text>
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
