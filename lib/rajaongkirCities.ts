export interface RajaOngkirCity {
  city_id: string;
  province_id: string;
  province: string;
  type: "Kota" | "Kabupaten";
  city_name: string;
  postal_code: string;
}

export const RAJAONGKIR_ORIGIN_DEFAULT: RajaOngkirCity = {
  city_id: "153",
  province_id: "6",
  province: "DKI Jakarta",
  type: "Kota",
  city_name: "Jakarta Selatan",
  postal_code: "12000",
};

export const POPULAR_CITIES: RajaOngkirCity[] = [
  // DKI Jakarta
  { city_id: "153", province_id: "6", province: "DKI Jakarta", type: "Kota", city_name: "Jakarta Selatan", postal_code: "12000" },
  { city_id: "152", province_id: "6", province: "DKI Jakarta", type: "Kota", city_name: "Jakarta Pusat", postal_code: "10000" },
  { city_id: "151", province_id: "6", province: "DKI Jakarta", type: "Kota", city_name: "Jakarta Barat", postal_code: "11000" },
  { city_id: "154", province_id: "6", province: "DKI Jakarta", type: "Kota", city_name: "Jakarta Timur", postal_code: "13000" },
  { city_id: "155", province_id: "6", province: "DKI Jakarta", type: "Kota", city_name: "Jakarta Utara", postal_code: "14000" },

  // Jawa Barat
  { city_id: "23", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Bandung", postal_code: "40111" },
  { city_id: "22", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Bandung", postal_code: "40311" },
  { city_id: "24", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Bandung Barat", postal_code: "40721" },
  { city_id: "54", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Bogor", postal_code: "16111" },
  { city_id: "55", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Bogor", postal_code: "16911" },
  { city_id: "115", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Depok", postal_code: "16411" },
  { city_id: "53", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Bekasi", postal_code: "17111" },
  { city_id: "52", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Bekasi", postal_code: "17511" },
  { city_id: "105", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Cimahi", postal_code: "40511" },
  { city_id: "108", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Cirebon", postal_code: "45111" },
  { city_id: "109", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Cirebon", postal_code: "45611" },
  { city_id: "468", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Tasikmalaya", postal_code: "46111" },
  { city_id: "469", province_id: "9", province: "Jawa Barat", type: "Kabupaten", city_name: "Tasikmalaya", postal_code: "46411" },
  { city_id: "430", province_id: "9", province: "Jawa Barat", type: "Kota", city_name: "Sukabumi", postal_code: "43111" },

  // Banten
  { city_id: "456", province_id: "3", province: "Banten", type: "Kota", city_name: "Tangerang", postal_code: "15111" },
  { city_id: "457", province_id: "3", province: "Banten", type: "Kota", city_name: "Tangerang Selatan", postal_code: "15311" },
  { city_id: "455", province_id: "3", province: "Banten", type: "Kabupaten", city_name: "Tangerang", postal_code: "15711" },
  { city_id: "402", province_id: "3", province: "Banten", type: "Kota", city_name: "Serang", postal_code: "42111" },
  { city_id: "106", province_id: "3", province: "Banten", type: "Kota", city_name: "Cilegon", postal_code: "42411" },

  // Jawa Timur
  { city_id: "444", province_id: "11", province: "Jawa Timur", type: "Kota", city_name: "Surabaya", postal_code: "60111" },
  { city_id: "419", province_id: "11", province: "Jawa Timur", type: "Kabupaten", city_name: "Sidoarjo", postal_code: "61211" },
  { city_id: "256", province_id: "11", province: "Jawa Timur", type: "Kota", city_name: "Malang", postal_code: "65111" },
  { city_id: "255", province_id: "11", province: "Jawa Timur", type: "Kabupaten", city_name: "Malang", postal_code: "65163" },
  { city_id: "163", province_id: "11", province: "Jawa Timur", type: "Kabupaten", city_name: "Gresik", postal_code: "61111" },
  { city_id: "179", province_id: "11", province: "Jawa Timur", type: "Kabupaten", city_name: "Jember", postal_code: "68111" },
  { city_id: "42", province_id: "11", province: "Jawa Timur", type: "Kabupaten", city_name: "Banyuwangi", postal_code: "68411" },
  { city_id: "193", province_id: "11", province: "Jawa Timur", type: "Kota", city_name: "Kediri", postal_code: "64111" },

  // Jawa Tengah & DIY
  { city_id: "399", province_id: "10", province: "Jawa Tengah", type: "Kota", city_name: "Semarang", postal_code: "50111" },
  { city_id: "398", province_id: "10", province: "Jawa Tengah", type: "Kabupaten", city_name: "Semarang", postal_code: "50511" },
  { city_id: "445", province_id: "10", province: "Jawa Tengah", type: "Kota", city_name: "Surakarta (Solo)", postal_code: "57111" },
  { city_id: "501", province_id: "5", province: "DI Yogyakarta", type: "Kota", city_name: "Yogyakarta", postal_code: "55111" },
  { city_id: "419", province_id: "5", province: "DI Yogyakarta", type: "Kabupaten", city_name: "Sleman", postal_code: "55511" },
  { city_id: "39", province_id: "5", province: "DI Yogyakarta", type: "Kabupaten", city_name: "Bantul", postal_code: "55711" },
  { city_id: "74", province_id: "10", province: "Jawa Tengah", type: "Kabupaten", city_name: "Banyumas (Purwokerto)", postal_code: "53111" },
  { city_id: "249", province_id: "10", province: "Jawa Tengah", type: "Kota", city_name: "Magelang", postal_code: "56111" },

  // Sumatera
  { city_id: "278", province_id: "34", province: "Sumatera Utara", type: "Kota", city_name: "Medan", postal_code: "20111" },
  { city_id: "116", province_id: "34", province: "Sumatera Utara", type: "Kabupaten", city_name: "Deli Serdang", postal_code: "20511" },
  { city_id: "327", province_id: "33", province: "Sumatera Selatan", type: "Kota", city_name: "Palembang", postal_code: "30111" },
  { city_id: "344", province_id: "26", province: "Riau", type: "Kota", city_name: "Pekanbaru", postal_code: "28111" },
  { city_id: "21", province_id: "17", province: "Kepulauan Riau", type: "Kota", city_name: "Batam", postal_code: "29411" },
  { city_id: "48", province_id: "18", province: "Lampung", type: "Kota", city_name: "Bandar Lampung", postal_code: "35111" },
  { city_id: "318", province_id: "32", province: "Sumatera Barat", type: "Kota", city_name: "Padang", postal_code: "25111" },
  { city_id: "156", province_id: "8", province: "Jambi", type: "Kota", city_name: "Jambi", postal_code: "36111" },
  { city_id: "62", province_id: "4", province: "Bengkulu", type: "Kota", city_name: "Bengkulu", postal_code: "38111" },
  { city_id: "20", province_id: "1", province: "Nanggroe Aceh Darussalam (NAD)", type: "Kota", city_name: "Banda Aceh", postal_code: "23111" },

  // Bali & Nusa Tenggara
  { city_id: "114", province_id: "1", province: "Bali", type: "Kota", city_name: "Denpasar", postal_code: "80111" },
  { city_id: "17", province_id: "1", province: "Bali", type: "Kabupaten", city_name: "Badung (Kuta)", postal_code: "80351" },
  { city_id: "128", province_id: "1", province: "Bali", type: "Kabupaten", city_name: "Gianyar (Ubud)", postal_code: "80511" },
  { city_id: "273", province_id: "22", province: "Nusa Tenggara Barat (NTB)", type: "Kota", city_name: "Mataram (Lombok)", postal_code: "83111" },
  { city_id: "213", province_id: "23", province: "Nusa Tenggara Timur (NTT)", type: "Kota", city_name: "Kupang", postal_code: "85111" },

  // Kalimantan
  { city_id: "19", province_id: "12", province: "Kalimantan Selatan", type: "Kota", city_name: "Banjarmasin", postal_code: "70111" },
  { city_id: "17", province_id: "15", province: "Kalimantan Timur", type: "Kota", city_name: "Balikpapan", postal_code: "76111" },
  { city_id: "387", province_id: "15", province: "Kalimantan Timur", type: "Kota", city_name: "Samarinda", postal_code: "75111" },
  { city_id: "365", province_id: "13", province: "Kalimantan Barat", type: "Kota", city_name: "Pontianak", postal_code: "78111" },
  { city_id: "326", province_id: "14", province: "Kalimantan Tengah", type: "Kota", city_name: "Palangka Raya", postal_code: "73111" },

  // Sulawesi
  { city_id: "254", province_id: "28", province: "Sulawesi Selatan", type: "Kota", city_name: "Makassar", postal_code: "90111" },
  { city_id: "255", province_id: "31", province: "Sulawesi Utara", type: "Kota", city_name: "Manado", postal_code: "95111" },
  { city_id: "328", province_id: "29", province: "Sulawesi Tengah", type: "Kota", city_name: "Palu", postal_code: "94111" },
  { city_id: "194", province_id: "30", province: "Sulawesi Tenggara", type: "Kota", city_name: "Kendari", postal_code: "93111" },

  // Maluku & Papua
  { city_id: "12", province_id: "19", province: "Maluku", type: "Kota", city_name: "Ambon", postal_code: "97111" },
  { city_id: "176", province_id: "24", province: "Papua", type: "Kota", city_name: "Jayapura", postal_code: "99111" },
];
