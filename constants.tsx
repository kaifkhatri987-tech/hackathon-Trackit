
import React from 'react';
import { BusRoute } from './types';

export const SURAT_CENTER = { lat: 21.1702, lng: 72.8311 };

// Sitilink / BRTS specific colors
export const COLORS = {
  SMC_BLUE: '#004A99',
  SMC_YELLOW: '#FFD100',
  BRTS_RED: '#E31E24'
};

export const DUMMY_ROUTES: BusRoute[] = [
  { id: '11', name: 'BRTS 11', type: 'BRT', timing: '06:00 AM - 10:30 PM', origin: 'UDHNA DARWAZA', destination: 'SACHIN G.I.D.C.', description: 'Udhna Darwaza <-> Sachin GIDC' },
  { id: '12', name: 'BRTS 12', type: 'BRT', timing: '06:15 AM - 10:00 PM', origin: 'ONGC COLONY', destination: 'SARTHANA NATURE PARK BRT', description: 'ONGC Colony <-> Sarthana Nature Park' },
  { id: '12B', name: 'BRTS 12B', type: 'BRT', timing: '07:00 AM - 09:30 PM', origin: 'BHAGWATI INDUSTRIAL ESTATE', destination: 'KHARWAR NAGAR', description: 'Bhagwati Ind. Estate <-> Kharwar Nagar' },
  { id: '13', name: 'BRTS 13', type: 'BRT', timing: '06:30 AM - 10:15 PM', origin: 'JAHANGIRPURA COMMUNITY HALL', destination: 'KADODARA', description: 'Jahangirpura <-> Kadodara' },
  { id: '14', name: 'BRTS 14', type: 'BRT', timing: '06:45 AM - 10:00 PM', origin: 'ONGC COLONY', destination: 'KOSAD EWS H2', description: 'ONGC Colony <-> Kosad EWS' },
  { id: '15AA', name: 'BRTS 15AA', type: 'BRT', timing: '06:00 AM - 11:00 PM', origin: 'ALTHAN DEPOT/TERMINAL', destination: 'ALTHAN DEPOT/TERMINAL', description: 'Althan Depot Circular (Anti-Clockwise)' },
  { id: '15CC', name: 'BRTS 15CC', type: 'BRT', timing: '06:00 AM - 11:00 PM', origin: 'ALTHAN DEPOT/TERMINAL', destination: 'ALTHAN DEPOT/TERMINAL', description: 'Althan Depot Circular (Clockwise)' },
  { id: '16', name: 'BRTS 16', type: 'BRT', timing: '07:00 AM - 10:30 PM', origin: 'KOSAD DEPOT', destination: 'PANDESARA GIDC', description: 'Kosad Depot <-> Pandesara GIDC' },
  { id: '17A', name: 'BRTS 17A', type: 'BRT', timing: '06:30 AM - 10:00 PM', origin: 'KAMREJ TERMINAL', destination: 'PAL R.T.O.', description: 'Kamrej Terminal <-> Pal RTO' },
  { id: '18', name: 'BRTS 18', type: 'BRT', timing: '06:45 AM - 09:45 PM', origin: 'RAILWAY STATION TER', destination: 'UTRAN-R.O.B BRIDGE', description: 'Railway Station <-> Utran ROB' },
  { id: '18P', name: 'BRTS 18P', type: 'BRT', timing: '07:15 AM - 09:15 PM', origin: 'PARVAT GAM', destination: 'D.G.V.C.L URJA SADAN BRT', description: 'Parvat Gam <-> DGVCL Urja Sadan' },
  { id: '19', name: 'BRTS 19', type: 'BRT', timing: '06:00 AM - 10:30 PM', origin: 'RAILWAY STATION TER', destination: 'KADODARA', description: 'Railway Station <-> Kadodara' },
  { id: '20', name: 'BRTS 20', type: 'BRT', timing: '07:00 AM - 10:00 PM', origin: 'KOSAD EWS H2', destination: 'KHARWAR NAGAR', description: 'Kosad EWS <-> Kharwar Nagar' },
  { id: '20D', name: 'BRTS 20D', type: 'BRT', timing: '07:30 AM - 08:30 PM', origin: 'CHANDRA SHEKHAR AZAD BRIDGE', destination: 'KATARGAM DARWAJA', description: 'CS Azad Bridge <-> Katargam Darwaja' },
  { id: '20K', name: 'BRTS 20K', type: 'BRT', timing: '07:30 AM - 09:00 PM', origin: 'CHANDRA SHEKHAR AZAD BRIDGE', destination: 'KATARGAM BRT', description: 'CS Azad Bridge <-> Katargam BRT' },
  { id: '21', name: 'BRTS 21', type: 'BRT', timing: '06:15 AM - 10:15 PM', origin: 'JAHANGIRPURA COMMUNITY HALL', destination: 'ALTHAN DEPOT/TERMINAL', description: 'Jahangirpura <-> Althan Depot' },
  { id: '22', name: 'BRTS 22', type: 'BRT', timing: '06:30 AM - 10:00 PM', origin: 'KOSAD EWS H2', destination: 'SARTHANA NATURE PARK BRT', description: 'Kosad EWS <-> Sarthana Nature Park' },
  { id: '22P', name: 'BRTS 22P', type: 'BRT', timing: '07:00 AM - 09:00 PM', origin: 'PARVAT GAM', destination: 'D.G.V.C.L URJA SADAN BRT', description: 'Parvat Gam <-> Urja Sadan' },
  { id: '23', name: 'BRTS 23', type: 'BRT', timing: '06:00 AM - 10:45 PM', origin: 'KAMREJ TERMINAL', destination: 'SACHIN RAILWAY STATION', description: 'Kamrej <-> Sachin Railway Station' },
  { id: '23D', name: 'BRTS 23D', type: 'BRT', timing: '07:15 AM - 09:30 PM', origin: 'ALTHAN DEPOT/TERMINAL', destination: 'DAKSHESWAR MAHADEV', description: 'Althan Depot <-> Daksheswar Mahadev' },
  { id: '23V', name: 'BRTS 23V', type: 'BRT', timing: '07:15 AM - 09:30 PM', origin: 'ALTHAN DEPOT/TERMINAL', destination: 'PANDESARA G.I.D.C.', description: 'Althan Depot <-> Pandesara GIDC' },
  { id: '1', name: 'Sitilink 1', type: 'City', timing: '07:00 AM - 09:00 PM', origin: 'ADAJAN GSRTC', destination: 'ADAJAN GSRTC', description: 'Adajan Circular' },
  { id: '2', name: 'Sitilink 2', type: 'City', timing: '07:00 AM - 09:00 PM', origin: 'ADAJAN GSRTC', destination: 'ADAJAN GSRTC', description: 'Adajan Circular' },
  { id: '102R', name: 'Sitilink 102R', type: 'City', timing: '08:00 AM - 08:00 PM', origin: 'RAILWAY STATION TER', destination: 'MOTI VED', description: 'Railway Station <-> Moti Ved' },
  { id: '103K', name: 'Sitilink 103K', type: 'City', timing: '07:30 AM - 08:30 PM', origin: 'LAMBE HANUMAN TEMPLE', destination: 'KATHOR GAAM', description: 'Lambe Hanuman <-> Kathor Gam' },
  { id: '103S', name: 'Sitilink 103S', type: 'City', timing: '07:30 AM - 08:30 PM', origin: 'LAMBE HANUMAN TEMPLE', destination: 'HARIDARSHAN RESIDENCY', description: 'Lambe Hanuman <-> Haridarshan' },
  { id: '103V', name: 'Sitilink 103V', type: 'City', timing: '07:30 AM - 08:30 PM', origin: 'LAMBE HANUMAN TEMPLE', destination: 'RAMVATIKA SOCIETY', description: 'Lambe Hanuman <-> Ramvatika' },
  { id: '104', name: 'Sitilink 104', type: 'City', timing: '08:00 AM - 09:00 PM', origin: 'RAILWAY STATION TER', destination: 'VRUKSHLAXMI SOCIETY', description: 'Railway Station <-> Vrukshlaxmi Society' },
  { id: '105', name: 'Sitilink 105', type: 'City', timing: '08:00 AM - 09:00 PM', origin: 'RAILWAY STATION TER', destination: 'CHIKU WADI', description: 'Railway Station <-> Chiku Wadi' },
  { id: '106R', name: 'Sitilink 106R', type: 'City', timing: '08:00 AM - 08:00 PM', origin: 'RAILWAY STATION TER', destination: 'ABHVA GAAM', description: 'Railway Station <-> Abhva Gam' },
  { id: '107J', name: 'Sitilink 107J', type: 'City', timing: '08:15 AM - 08:45 PM', origin: 'RAILWAY STATION TER', destination: 'VIVEKANAND COLLEGE', description: 'Railway Station <-> Vivekanand College' },
  { id: '112', name: 'Sitilink 112', type: 'City', timing: '08:00 AM - 09:00 PM', origin: 'RAILWAY STATION TER', destination: 'KOSAD GAM', description: 'Railway Station <-> Kosad Gam' },
  { id: '116R', name: 'Sitilink 116R', type: 'City', timing: '08:30 AM - 07:30 PM', origin: 'RAILWAY STATION TER', destination: 'KHAJOD GAM', description: 'Railway Station <-> Khajod Gam' },
  { id: '136', name: 'Sitilink 136', type: 'City', timing: '06:00 AM - 10:00 PM', origin: 'RAILWAY STATION TER', destination: 'SURAT AIRPORT', description: 'Railway Station <-> Surat Airport' },
  { id: '146', name: 'Sitilink 146', type: 'City', timing: '08:00 AM - 09:00 PM', origin: 'RAILWAY STATION TER', destination: 'GAIL INDIA LTD VIP ROAD', description: 'Railway Station <-> GAIL India' },
  { id: '216B', name: 'Sitilink 216B', type: 'City', timing: '07:00 AM - 08:00 PM', origin: 'CHOWK', destination: 'DUMAS LANGAR', description: 'Chowk <-> Dumas Langar' },
  { id: '226J', name: 'Sitilink 226J', type: 'City', timing: '08:00 AM - 08:00 PM', origin: 'KOSAD GAM', destination: 'V.N.S.G. UNIVERSITY', description: 'Kosad Gam <-> VNSGU' },
  { id: '506', name: 'Sitilink 506', type: 'City', timing: '07:30 AM - 08:30 PM', origin: 'SUNRISE VIDYALAY DINDOLI', destination: 'VESU GAAM', description: 'Sunrise Vidyalaya <-> Vesu Gam' },
  { id: 'SDB-1', name: 'Sitilink SDB-1', type: 'City', timing: '08:00 AM - 08:00 PM', origin: 'KATARGAM BRT', destination: 'SURAT DIAMOND BOURSE', description: 'Katargam BRT <-> Surat Diamond Bourse' },
  { id: 'SDB-2', name: 'Sitilink SDB-2', type: 'City', timing: '08:00 AM - 08:00 PM', origin: 'MANGADH CHOWK', destination: 'SURAT DIAMOND BOURSE', description: 'Mangadh Chowk <-> Surat Diamond Bourse' },
];

export const ANDROID_CODE_SNIPPETS = {
  manifest: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Permissions for Location and Real-time data -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

    <application
        android:name=".SuratBusApp"
        android:theme="@style/Theme.SuratBusLive">
        
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="\${MAPS_API_KEY}" />

        <activity android:name=".MainActivity" ... />
    </application>
</manifest>`,

  viewModel: `class BusViewModel : ViewModel() {
    private val database = FirebaseDatabase.getInstance().getReference("buses")
    private val _busLocations = MutableStateFlow<List<BusLocation>>(emptyList())
    val busLocations: StateFlow<List<BusLocation>> = _busLocations

    fun startSharingLocation(busId: String, latLng: LatLng) {
        val locationMap = mapOf(
            "lat" to latLng.latitude,
            "lng" to latLng.longitude,
            "lastUpdated" to ServerValue.TIMESTAMP
        )
        database.child(busId).child("location").setValue(locationMap)
    }

    fun observeBuses() {
        database.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                // Parse snapshot to list of BusLocation objects
            }
            override fun onCancelled(error: DatabaseError) {}
        })
    }
}`,

  conductorScreen: `@Composable
fun ConductorScreen(viewModel: BusViewModel) {
    var isTracking by remember { mutableStateOf(false) }
    val context = LocalContext.current

    Column(modifier = Modifier.fillMaxSize().padding(24.dp)) {
        Text("Conductor Dashboard", style = MaterialTheme.typography.h4)
        Spacer(modifier = Modifier.height(32.dp))
        
        Button(
            onClick = { isTracking = !isTracking },
            colors = ButtonDefaults.buttonColors(
                backgroundColor = if (isTracking) Color.Red else Color.Green
            )
        ) {
            Text(if (isTracking) "STOP TRIP" else "START TRIP")
        }
    }
}`,

  firebaseJson: `{
  "buses": {
    "bus_101": {
      "location": {
        "lat": 21.1702,
        "lng": 72.8311,
        "lastUpdated": 1715000000000
      },
      "metadata": {
        "route": "101",
        "conductor": "Rahul Sharma"
      }
    }
  }
}`
};
