module.exports = [
"[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HostDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const AMENITIES = [
    'WiFi',
    'Water',
    'Security',
    'Kitchen',
    'Parking',
    'Laundry',
    'Generator',
    'CCTV',
    'Gym',
    'Study Room',
    'Hot Shower',
    'Furnished'
];
const ROOM_TYPES = [
    'Single Room',
    'Double Room',
    'Triple Room',
    'Quad Room',
    'Self Contained',
    'Studio'
];
const ROOM_CAPACITIES = {
    'Single Room': 1,
    'Double Room': 2,
    'Triple Room': 3,
    'Quad Room': 4,
    'Self Contained': 2,
    'Studio': 1
};
const SB = {
    pending: {
        bg: '#fef3c7',
        color: '#92400e',
        dot: '#f59e0b',
        label: 'Pending'
    },
    confirmed: {
        bg: '#d1fae5',
        color: '#065f46',
        dot: '#10b981',
        label: 'Confirmed'
    },
    cancelled: {
        bg: '#fee2e2',
        color: '#991b1b',
        dot: '#ef4444',
        label: 'Cancelled'
    },
    unpaid: {
        bg: '#fee2e2',
        color: '#991b1b',
        dot: '#ef4444',
        label: 'Unpaid'
    },
    pending_confirmation: {
        bg: '#fef3c7',
        color: '#92400e',
        dot: '#f59e0b',
        label: 'Verifying'
    },
    paid: {
        bg: '#d1fae5',
        color: '#065f46',
        dot: '#10b981',
        label: 'Paid'
    },
    approved: {
        bg: '#d1fae5',
        color: '#065f46',
        dot: '#10b981',
        label: 'Live'
    },
    rejected: {
        bg: '#fee2e2',
        color: '#991b1b',
        dot: '#ef4444',
        label: 'Rejected'
    }
};
function HostDashboard() {
    const { user, logout, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [hostels, setHostels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('hostels');
    const [subTab, setSubTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // hostel id for room view
    const [sideOpen, setSideOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [actionLoading, setActionLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modal, setModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletePassword, setDeletePassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Forms
    const [hostelForm, setHostelForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        city: '',
        address: '',
        description: '',
        university_id: '',
        distance_from_university: '',
        amenities: [],
        transport_notes: '',
        latitude: '',
        longitude: ''
    });
    const addressInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autocompleteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapsLoaded, setMapsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [roomForm, setRoomForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        room_label: '',
        room_type: 'Single Room',
        floor: '',
        capacity: 1,
        price_per_semester: '',
        available_count: 1,
        description: '',
        features: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading) return;
        if (!user || user.role !== 'host') {
            router.push('/login');
            return;
        }
        fetchAll();
    }, [
        user,
        loading
    ]);
    const fetchAll = async ()=>{
        setDataLoading(true);
        try {
            const [h, b] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/host/hostels'),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/host/bookings').catch(()=>({
                        data: {
                            bookings: []
                        }
                    }))
            ]);
            setHostels(h.data.hostels || []);
            setBookings(b.data.bookings || []);
        } catch (e) {
            console.error(e);
        } finally{
            setDataLoading(false);
        }
    };
    // ── Google Maps Places Autocomplete ─────────────────────────────
    const loadGoogleMaps = ()=>{
        if (window.google?.maps?.places) {
            setMapsLoaded(true);
            return;
        }
        if (document.getElementById('gmaps-script')) return;
        const script = document.createElement('script');
        script.id = 'gmaps-script';
        // Add NEXT_PUBLIC_GOOGLE_MAPS_KEY to your .env.local file
        // Get key at: console.cloud.google.com → Enable Places API + Maps JavaScript API
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&libraries=places&callback=dormLinkMapsInit`;
        script.async = true;
        script.defer = true;
        window.dormLinkMapsInit = ()=>setMapsLoaded(true);
        document.head.appendChild(script);
    };
    const initAutocomplete = ()=>{
        if (!mapsLoaded || !addressInputRef.current || !window.google?.maps?.places) return;
        if (autocompleteRef.current) return;
        const ac = new window.google.maps.places.Autocomplete(addressInputRef.current, {
            componentRestrictions: {
                country: 'tz'
            },
            fields: [
                'formatted_address',
                'geometry',
                'address_components'
            ]
        });
        ac.addListener('place_changed', ()=>{
            const place = ac.getPlace();
            if (!place.geometry) return;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            let city = '';
            for (const comp of place.address_components || []){
                if (comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')) {
                    city = comp.long_name;
                    break;
                }
            }
            autocompleteRef._lastLatLng = {
                lat,
                lng
            };
            setHostelForm((f)=>({
                    ...f,
                    address: place.formatted_address,
                    latitude: lat.toFixed(6),
                    longitude: lng.toFixed(6),
                    city: city || f.city
                }));
        });
        autocompleteRef.current = ac;
    };
    // Haversine distance in km between two lat/lng points
    const haversine = (lat1, lng1, lat2, lng2)=>{
        const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
    };
    // Known coordinates for Tanzania universities
    const UNI_COORDS = {
        'UDSM': [
            -6.7702,
            39.2135
        ],
        'CoET': [
            -6.7702,
            39.2135
        ],
        'MUHAS': [
            -6.8022,
            39.2092
        ],
        'DIT': [
            -6.8196,
            39.2803
        ],
        'IFM': [
            -6.8009,
            39.2796
        ],
        'ISW': [
            -6.7867,
            39.2574
        ],
        'ARU': [
            -6.7737,
            39.2215
        ],
        'OUT': [
            -6.7851,
            39.2183
        ],
        'UDOM': [
            -6.1765,
            35.7394
        ],
        'SUA': [
            -6.8484,
            37.6503
        ],
        'MU': [
            -6.9048,
            37.6710
        ],
        'NM-AIST': [
            -3.3991,
            36.9972
        ],
        'MoCU': [
            -3.3464,
            37.3445
        ],
        'SAUT': [
            -2.4936,
            32.9002
        ],
        'MUST': [
            -8.9153,
            33.4563
        ],
        'BUGANDO': [
            -2.5180,
            32.8964
        ],
        'TIA': [
            -6.8012,
            39.2728
        ],
        'RUCU': [
            -7.7714,
            35.7157
        ],
        'MUCE': [
            -7.7714,
            35.7157
        ],
        'ZU': [
            -6.1638,
            39.1915
        ],
        'SUZA': [
            -6.1590,
            39.1968
        ],
        'AKU': [
            -6.7924,
            39.2083
        ],
        'IMTU': [
            -6.7712,
            39.2498
        ],
        'MUM': [
            -6.8290,
            37.6534
        ]
    };
    const autoCalcDistance = (uniShort)=>{
        const llng = autocompleteRef._lastLatLng;
        if (!llng) return;
        const coords = UNI_COORDS[uniShort];
        if (!coords) return;
        const dist = haversine(llng.lat, llng.lng, coords[0], coords[1]);
        setHostelForm((f)=>({
                ...f,
                distance_from_university: dist
            }));
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success(`Distance calculated: ${dist} km from ${uniShort}`);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadGoogleMaps();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mapsLoaded && (modal?.type === 'add_hostel' || modal?.type === 'edit_hostel')) {
            setTimeout(initAutocomplete, 150);
        }
        if (!modal) {
            autocompleteRef.current = null;
        }
    }, [
        mapsLoaded,
        modal
    ]);
    const submitHostel = async ()=>{
        if (!hostelForm.name || !hostelForm.city || !hostelForm.address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Name, city and address required');
            return;
        }
        setActionLoading(true);
        try {
            if (modal?.type === 'edit_hostel') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/host/hostels/${modal.item.id}`, hostelForm);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Hostel updated');
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/host/hostels', hostelForm);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Hostel submitted for admin review!');
            }
            fetchAll();
            setModal(null);
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const submitRoom = async ()=>{
        if (!roomForm.room_label || !roomForm.price_per_semester) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Room label and price required');
            return;
        }
        setActionLoading(true);
        try {
            const hostelId = modal?.hostelId;
            if (modal?.type === 'edit_room') {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/host/rooms/${modal.item.id}`, roomForm);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Room updated');
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/host/hostels/${hostelId}/rooms`, roomForm);
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Room added!');
            }
            fetchAll();
            setModal(null);
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const deleteRoom = async (roomId)=>{
        setActionLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/host/rooms/${roomId}`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Room deleted');
            fetchAll();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const confirmBooking = async (id)=>{
        setActionLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/host/bookings/${id}/confirm`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Booking confirmed! Student notified.');
            fetchAll();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const rejectBooking = async (id)=>{
        setActionLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/host/bookings/${id}/reject`);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Booking rejected');
            fetchAll();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const deleteAccount = async ()=>{
        if (!deletePassword) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('Enter password');
            return;
        }
        setActionLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete('/host/account', {
                data: {
                    password: deletePassword
                }
            });
            logout();
            router.push('/');
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error(e.response?.data?.error || 'Failed');
        } finally{
            setActionLoading(false);
        }
    };
    const openAddRoom = (hostelId)=>{
        setRoomForm({
            room_label: '',
            room_type: 'Single Room',
            floor: '',
            capacity: 1,
            price_per_semester: '',
            available_count: 1,
            description: '',
            features: []
        });
        setModal({
            type: 'add_room',
            hostelId
        });
    };
    const openEditRoom = (room)=>{
        setRoomForm({
            ...room
        });
        setModal({
            type: 'edit_room',
            item: room
        });
    };
    const openAddHostel = ()=>{
        setHostelForm({
            name: '',
            city: '',
            address: '',
            description: '',
            university_id: '',
            distance_from_university: '',
            amenities: [],
            transport_notes: '',
            latitude: '',
            longitude: ''
        });
        autocompleteRef._lastLatLng = null;
        setModal({
            type: 'add_hostel'
        });
    };
    const openEditHostel = (h)=>{
        setHostelForm({
            name: h.name,
            city: h.city,
            address: h.address,
            description: h.description || '',
            university_id: h.university_id || '',
            distance_from_university: h.distance_from_university || '',
            amenities: h.amenities || [],
            transport_notes: h.transport_notes || '',
            latitude: h.latitude || '',
            longitude: h.longitude || ''
        });
        if (h.latitude && h.longitude) {
            autocompleteRef._lastLatLng = {
                lat: parseFloat(h.latitude),
                lng: parseFloat(h.longitude)
            };
        }
        setModal({
            type: 'edit_hostel',
            item: h
        });
    };
    const toggleAmenity = (a)=>setHostelForm((f)=>({
                ...f,
                amenities: f.amenities.includes(a) ? f.amenities.filter((x)=>x !== a) : [
                    ...f.amenities,
                    a
                ]
            }));
    const pendingBookings = bookings.filter((b)=>b.status === 'pending');
    const selectedHostel = hostels.find((h)=>h.id === subTab);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Loader, {}, void 0, false, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 231,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: CSS
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "layout",
                children: [
                    sideOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overlay",
                        onClick: ()=>setSideOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 240,
                        columnNumber: 22
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: `sidebar ${sideOpen ? 'open' : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sb-brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sb-logo",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
                                                    stroke: "white",
                                                    strokeWidth: "2.5",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M9 22V12h6v10",
                                                    stroke: "white",
                                                    strokeWidth: "2.5",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 247,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sb-name",
                                        children: "DormLink"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sb-user",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sb-av",
                                        children: [
                                            user?.first_name?.[0],
                                            user?.last_name?.[0]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sb-fullname",
                                                children: [
                                                    user?.first_name,
                                                    " ",
                                                    user?.last_name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 256,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sb-tag",
                                                children: "Host"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 257,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "sb-nav",
                                children: [
                                    {
                                        id: 'hostels',
                                        icon: 'apartment',
                                        label: 'My Properties'
                                    },
                                    {
                                        id: 'bookings',
                                        icon: 'receipt_long',
                                        label: 'Bookings',
                                        count: pendingBookings.length
                                    },
                                    {
                                        id: 'account',
                                        icon: 'manage_accounts',
                                        label: 'Account'
                                    }
                                ].map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `sb-btn ${tab === n.id && !subTab ? 'active' : ''}`,
                                        onClick: ()=>{
                                            setTab(n.id);
                                            setSubTab(null);
                                            setSideOpen(false);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons-round sb-icon",
                                                children: n.icon
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: n.label
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this),
                                            n.count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sb-count",
                                                children: n.count
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 271,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, n.id, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sb-foot",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "sb-signout",
                                    onClick: logout,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons-round",
                                            style: {
                                                fontSize: '15px'
                                            },
                                            children: "logout"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this),
                                        "Sign out"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 277,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "topbar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tb-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "hamburger",
                                                onClick: ()=>setSideOpen(true),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons-round",
                                                    children: "menu"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 288,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 287,
                                                columnNumber: 15
                                            }, this),
                                            subTab ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "back-btn",
                                                        onClick: ()=>setSubTab(null),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-icons-round",
                                                            style: {
                                                                fontSize: '16px'
                                                            },
                                                            children: "arrow_back"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 293,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 292,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "tb-title",
                                                        children: [
                                                            selectedHostel?.name,
                                                            " \\u2014 Rooms"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 295,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tb-title",
                                                children: [
                                                    tab === 'hostels' && 'My Properties',
                                                    tab === 'bookings' && 'Bookings',
                                                    tab === 'account' && 'Account'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 298,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    tab === 'hostels' && !subTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "tb-cta",
                                        onClick: openAddHostel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons-round",
                                                style: {
                                                    fontSize: '15px'
                                                },
                                                children: "add"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this),
                                            "Add Property"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    subTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "tb-cta",
                                        onClick: ()=>openAddRoom(subTab),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons-round",
                                                style: {
                                                    fontSize: '15px'
                                                },
                                                children: "add"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this),
                                            "Add Room"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "content",
                                children: [
                                    !subTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stats",
                                        children: [
                                            {
                                                n: hostels.length,
                                                l: 'Properties',
                                                icon: 'apartment'
                                            },
                                            {
                                                n: hostels.filter((h)=>h.status === 'approved').length,
                                                l: 'Live',
                                                icon: 'check_circle',
                                                good: true
                                            },
                                            {
                                                n: bookings.length,
                                                l: 'Bookings',
                                                icon: 'receipt_long'
                                            },
                                            {
                                                n: pendingBookings.length,
                                                l: 'Need Review',
                                                icon: 'schedule',
                                                warn: pendingBookings.length > 0
                                            }
                                        ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `stat ${s.good && s.n > 0 ? 'good' : s.warn && s.n > 0 ? 'warn' : ''}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons-round stat-icon",
                                                        children: s.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stat-n",
                                                        children: s.n
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "stat-l",
                                                        children: s.l
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 332,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, this),
                                    tab === 'hostels' && !subTab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-hd",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel-title",
                                                        children: "Properties"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 342,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel-sub",
                                                        children: [
                                                            hostels.length,
                                                            " total"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 343,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this),
                                            dataLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 345,
                                                    columnNumber: 55
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 345,
                                                columnNumber: 32
                                            }, this) : hostels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons-round",
                                                        style: {
                                                            fontSize: '40px',
                                                            color: '#cbd5e1',
                                                            display: 'block',
                                                            marginBottom: '12px'
                                                        },
                                                        children: "apartment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 348,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: '500',
                                                            color: '#475569',
                                                            marginBottom: '4px'
                                                        },
                                                        children: "No properties yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 349,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '13px',
                                                            color: '#94a3b8',
                                                            marginBottom: '16px'
                                                        },
                                                        children: "Add your first hostel to start receiving bookings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 350,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "btn-primary",
                                                        onClick: openAddHostel,
                                                        children: "Add Property"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 351,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hostel-list",
                                                children: hostels.map((h)=>{
                                                    const st = SB[h.status] || SB.pending;
                                                    const totalRooms = h.rooms?.length || 0;
                                                    const availRooms = h.rooms?.filter((r)=>!r.is_full).length || 0;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "hostel-row",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "hostel-row-left",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "hostel-icon",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "material-icons-round",
                                                                            style: {
                                                                                fontSize: '20px',
                                                                                color: '#64748b'
                                                                            },
                                                                            children: "apartment"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 363,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 362,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "hostel-name",
                                                                                children: h.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 366,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "hostel-meta",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "material-icons-round",
                                                                                                style: {
                                                                                                    fontSize: '12px',
                                                                                                    verticalAlign: 'middle'
                                                                                                },
                                                                                                children: "place"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                                lineNumber: 368,
                                                                                                columnNumber: 39
                                                                                            }, this),
                                                                                            " ",
                                                                                            h.city
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 368,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    h.universities?.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: [
                                                                                            "\\u00b7 ",
                                                                                            h.universities.name
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 369,
                                                                                        columnNumber: 58
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: [
                                                                                            "\\u00b7 ",
                                                                                            totalRooms,
                                                                                            " rooms"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 370,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    totalRooms > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        style: {
                                                                                            color: availRooms === 0 ? '#ef4444' : '#10b981'
                                                                                        },
                                                                                        children: [
                                                                                            "\\u00b7 ",
                                                                                            availRooms,
                                                                                            " available"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 371,
                                                                                        columnNumber: 52
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 367,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 365,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 361,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "hostel-row-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "badge",
                                                                        style: {
                                                                            background: st.bg,
                                                                            color: st.color
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    width: '5px',
                                                                                    height: '5px',
                                                                                    borderRadius: '50%',
                                                                                    background: st.dot,
                                                                                    display: 'inline-block',
                                                                                    marginRight: '5px'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 377,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            st.label
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 376,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "act-row",
                                                                        children: [
                                                                            h.status === 'approved' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "act-btn blue",
                                                                                onClick: ()=>setSubTab(h.id),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "material-icons-round",
                                                                                        style: {
                                                                                            fontSize: '13px'
                                                                                        },
                                                                                        children: "bed"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 383,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    "Rooms"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 382,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "act-btn gray",
                                                                                onClick: ()=>openEditHostel(h),
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "material-icons-round",
                                                                                    style: {
                                                                                        fontSize: '13px'
                                                                                    },
                                                                                    children: "edit"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 388,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 387,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 380,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 375,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, h.id, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 360,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    tab === 'hostels' && subTab && selectedHostel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "hostel-summary-bar",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontWeight: '600',
                                                                    color: '#0f172a'
                                                                },
                                                                children: selectedHostel.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 405,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    color: '#94a3b8',
                                                                    marginTop: '2px'
                                                                },
                                                                children: [
                                                                    selectedHostel.address,
                                                                    " \\u00b7 ",
                                                                    selectedHostel.city
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 406,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 404,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '16px',
                                                            fontSize: '13px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: selectedHostel.rooms?.length || 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 409,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: '#94a3b8'
                                                                        },
                                                                        children: "rooms"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 409,
                                                                        columnNumber: 79
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 409,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        style: {
                                                                            color: '#10b981'
                                                                        },
                                                                        children: selectedHostel.rooms?.filter((r)=>!r.is_full).length || 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 410,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: '#94a3b8'
                                                                        },
                                                                        children: "available"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 410,
                                                                        columnNumber: 127
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 410,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 408,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 403,
                                                columnNumber: 17
                                            }, this),
                                            !selectedHostel.rooms?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "empty",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-icons-round",
                                                            style: {
                                                                fontSize: '40px',
                                                                color: '#cbd5e1',
                                                                display: 'block',
                                                                marginBottom: '12px'
                                                            },
                                                            children: "bed"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 417,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: '500',
                                                                color: '#475569',
                                                                marginBottom: '4px'
                                                            },
                                                            children: "No rooms added yet"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 418,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '13px',
                                                                color: '#94a3b8',
                                                                marginBottom: '16px'
                                                            },
                                                            children: 'Add rooms one by one with labels like "A101", "B205"'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 419,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "btn-primary",
                                                            onClick: ()=>openAddRoom(subTab),
                                                            children: "Add First Room"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 420,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 416,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 415,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rooms-grid",
                                                children: [
                                                    selectedHostel.rooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `room-tile ${room.is_full ? 'full' : ''}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-head",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "room-label-badge",
                                                                            children: room.room_label || 'Room'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 428,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        room.is_full ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "room-status-badge full",
                                                                            children: "Full"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 430,
                                                                            columnNumber: 29
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "room-status-badge avail",
                                                                            children: [
                                                                                room.available_count,
                                                                                " left"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 432,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 427,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-type",
                                                                    children: room.room_type
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 435,
                                                                    columnNumber: 25
                                                                }, this),
                                                                room.floor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-meta",
                                                                    children: [
                                                                        "Floor ",
                                                                        room.floor
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 436,
                                                                    columnNumber: 40
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-info",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "room-info-item",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "material-icons-round",
                                                                                    style: {
                                                                                        fontSize: '14px',
                                                                                        color: '#94a3b8'
                                                                                    },
                                                                                    children: "people"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 439,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                room.capacity,
                                                                                " person",
                                                                                room.capacity > 1 ? 's' : ''
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 438,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "room-info-item",
                                                                            style: {
                                                                                color: '#1d4ed8',
                                                                                fontWeight: '600'
                                                                            },
                                                                            children: [
                                                                                "TZS ",
                                                                                parseFloat(room.price_per_semester || 0).toLocaleString(),
                                                                                "/sem"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 442,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 437,
                                                                    columnNumber: 25
                                                                }, this),
                                                                room.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-desc",
                                                                    children: room.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 446,
                                                                    columnNumber: 46
                                                                }, this),
                                                                room.features?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-features",
                                                                    children: room.features.slice(0, 3).map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "room-feat-chip",
                                                                            children: f
                                                                        }, i, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 449,
                                                                            columnNumber: 68
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 448,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "room-tile-actions",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "act-btn gray",
                                                                            style: {
                                                                                flex: 1,
                                                                                justifyContent: 'center'
                                                                            },
                                                                            onClick: ()=>openEditRoom(room),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "material-icons-round",
                                                                                    style: {
                                                                                        fontSize: '13px'
                                                                                    },
                                                                                    children: "edit"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 454,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                "Edit"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 453,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "act-btn red",
                                                                            onClick: ()=>{
                                                                                if (confirm('Delete this room?')) deleteRoom(room.id);
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "material-icons-round",
                                                                                style: {
                                                                                    fontSize: '13px'
                                                                                },
                                                                                children: "delete"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 458,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 457,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 452,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, room.id, true, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 426,
                                                            columnNumber: 23
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "room-tile add-room-tile",
                                                        onClick: ()=>openAddRoom(subTab),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-icons-round",
                                                                style: {
                                                                    fontSize: '28px',
                                                                    color: '#cbd5e1',
                                                                    marginBottom: '8px'
                                                                },
                                                                children: "add_circle_outline"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 464,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#94a3b8',
                                                                    fontWeight: '500'
                                                                },
                                                                children: "Add Room"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 465,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 463,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 424,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, this),
                                    tab === 'bookings' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-hd",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel-title",
                                                        children: "Bookings"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 476,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel-sub",
                                                        children: [
                                                            pendingBookings.length,
                                                            " pending review"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 477,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 475,
                                                columnNumber: 17
                                            }, this),
                                            bookings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "empty",
                                                children: "No bookings yet"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "tbl-wrap",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                            className: "tbl",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Student"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Property"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 47
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Room"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 64
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Semester"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 77
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Deposit"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 94
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Status"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 110
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Payment"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 125
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                                children: "Action"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 486,
                                                                                columnNumber: 141
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 486,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 485,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                                    children: bookings.map((b)=>{
                                                                        const bs = SB[b.status] || SB.pending;
                                                                        const ps = SB[b.payment_status] || SB.unpaid;
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                            className: b.status === 'pending' ? 'highlight' : '',
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "cell-main",
                                                                                            children: [
                                                                                                b.users?.first_name,
                                                                                                " ",
                                                                                                b.users?.last_name
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                            lineNumber: 495,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "cell-sub",
                                                                                            children: b.users?.phone
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                            lineNumber: 496,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 494,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "cell-main",
                                                                                    children: b.hostels?.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 498,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "cell-main",
                                                                                            children: b.rooms?.room_label
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                            lineNumber: 500,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "cell-sub",
                                                                                            children: b.rooms?.room_type
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                            lineNumber: 501,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    className: "cell-sub",
                                                                                    children: b.semester
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 503,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    style: {
                                                                                        color: '#1d4ed8',
                                                                                        fontWeight: '600',
                                                                                        fontSize: '13px'
                                                                                    },
                                                                                    children: [
                                                                                        "TZS ",
                                                                                        parseFloat(b.deposit_amount || 0).toLocaleString()
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 504,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                        s: bs
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 505,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 505,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                        s: ps
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 506,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 506,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "act-row",
                                                                                        children: b.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    className: "act-btn green",
                                                                                                    onClick: ()=>confirmBooking(b.id),
                                                                                                    disabled: actionLoading,
                                                                                                    children: "Confirm"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                                    lineNumber: 510,
                                                                                                    columnNumber: 39
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    className: "act-btn red",
                                                                                                    onClick: ()=>rejectBooking(b.id),
                                                                                                    disabled: actionLoading,
                                                                                                    children: "Reject"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                                    lineNumber: 511,
                                                                                                    columnNumber: 39
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 508,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                    lineNumber: 507,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, b.id, true, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                            lineNumber: 493,
                                                                            columnNumber: 31
                                                                        }, this);
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                    lineNumber: 488,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                            lineNumber: 484,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 483,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mobile-cards",
                                                        children: bookings.map((b)=>{
                                                            const bs = SB[b.status] || SB.pending;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "m-card",
                                                                style: {
                                                                    background: b.status === 'pending' ? '#fffbeb' : 'white'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "m-card-top",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "m-hostel",
                                                                                        children: [
                                                                                            b.users?.first_name,
                                                                                            " ",
                                                                                            b.users?.last_name
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 529,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "m-room",
                                                                                        children: [
                                                                                            b.hostels?.name,
                                                                                            " \\u00b7 ",
                                                                                            b.rooms?.room_label,
                                                                                            " \\u00b7 ",
                                                                                            b.semester
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                        lineNumber: 530,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 528,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                                s: bs
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 532,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 527,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: '14px',
                                                                            fontWeight: '600',
                                                                            color: '#1d4ed8',
                                                                            margin: '8px 0'
                                                                        },
                                                                        children: [
                                                                            "Deposit: TZS ",
                                                                            parseFloat(b.deposit_amount || 0).toLocaleString()
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 534,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    b.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "m-actions",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "act-btn green",
                                                                                style: {
                                                                                    flex: 1,
                                                                                    justifyContent: 'center'
                                                                                },
                                                                                onClick: ()=>confirmBooking(b.id),
                                                                                children: "Confirm"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 539,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "act-btn red",
                                                                                style: {
                                                                                    flex: 1,
                                                                                    justifyContent: 'center'
                                                                                },
                                                                                onClick: ()=>rejectBooking(b.id),
                                                                                children: "Reject"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 540,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 538,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, b.id, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 526,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 522,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 474,
                                        columnNumber: 15
                                    }, this),
                                    tab === 'account' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-hd",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "panel-title",
                                                    children: "Account Settings"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 555,
                                                    columnNumber: 43
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 555,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '20px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "acct-section",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "acct-section-title",
                                                                children: "Profile"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 558,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "acct-info-row",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "sb-av",
                                                                        style: {
                                                                            width: '44px',
                                                                            height: '44px',
                                                                            fontSize: '16px'
                                                                        },
                                                                        children: [
                                                                            user?.first_name?.[0],
                                                                            user?.last_name?.[0]
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 560,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontWeight: '600',
                                                                                    color: '#0f172a'
                                                                                },
                                                                                children: [
                                                                                    user?.first_name,
                                                                                    " ",
                                                                                    user?.last_name
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 562,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '13px',
                                                                                    color: '#94a3b8'
                                                                                },
                                                                                children: user?.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 563,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '12px',
                                                                                    color: '#94a3b8'
                                                                                },
                                                                                children: user?.phone || 'No phone'
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                                lineNumber: 564,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 561,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 559,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 557,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "acct-section danger-zone",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "acct-section-title",
                                                                style: {
                                                                    color: '#ef4444'
                                                                },
                                                                children: "Danger Zone"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 569,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: '13px',
                                                                    color: '#64748b',
                                                                    marginBottom: '14px',
                                                                    lineHeight: '1.6'
                                                                },
                                                                children: "Permanently delete your host account and all properties."
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 570,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "btn-danger-outline",
                                                                onClick: ()=>setModal({
                                                                        type: 'delete_account'
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-icons-round",
                                                                        style: {
                                                                            fontSize: '15px'
                                                                        },
                                                                        children: "delete_forever"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                        lineNumber: 574,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Delete My Account"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                                lineNumber: 573,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                        lineNumber: 568,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                lineNumber: 556,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 239,
                columnNumber: 7
            }, this),
            (modal?.type === 'add_hostel' || modal?.type === 'edit_hostel') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BigModal, {
                title: modal.type === 'edit_hostel' ? 'Edit Property' : 'Add New Property',
                onClose: ()=>setModal(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-grid2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Property Name *",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    placeholder: "e.g. Sunrise Hostel",
                                    value: hostelForm.name,
                                    onChange: (e)=>setHostelForm((f)=>({
                                                ...f,
                                                name: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 590,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 589,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "City *",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    placeholder: "e.g. Dar es Salaam",
                                    value: hostelForm.city,
                                    onChange: (e)=>setHostelForm((f)=>({
                                                ...f,
                                                city: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 593,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 592,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 588,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Full Address *",
                        hint: mapsLoaded ? "✓ Autocomplete active — select from dropdown" : "Type address manually or add Maps API key for autocomplete",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: addressInputRef,
                                    className: "finput",
                                    placeholder: "Type your hostel address in Tanzania...",
                                    defaultValue: hostelForm.address,
                                    onChange: (e)=>setHostelForm((f)=>({
                                                ...f,
                                                address: e.target.value
                                            })),
                                    style: {
                                        paddingRight: '36px'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 598,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '16px',
                                        color: mapsLoaded ? '#10b981' : '#94a3b8'
                                    },
                                    children: mapsLoaded ? 'my_location' : 'location_on'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 606,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 597,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this),
                    hostelForm.latitude && hostelForm.longitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            marginBottom: '14px',
                            fontSize: '12px',
                            color: '#065f46',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons-round",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "check_circle"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 614,
                                columnNumber: 15
                            }, this),
                            "GPS coordinates auto-detected: ",
                            hostelForm.latitude,
                            ", ",
                            hostelForm.longitude
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 613,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-grid2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Distance from University (km)",
                                hint: "Auto-calculated when you pick address + university",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '6px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "finput",
                                            type: "number",
                                            step: "0.1",
                                            placeholder: "e.g. 0.5",
                                            value: hostelForm.distance_from_university,
                                            onChange: (e)=>setHostelForm((f)=>({
                                                        ...f,
                                                        distance_from_university: e.target.value
                                                    })),
                                            style: {
                                                flex: 1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                            lineNumber: 622,
                                            columnNumber: 17
                                        }, this),
                                        autocompleteRef._lastLatLng && hostelForm.university_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            title: "Auto-calculate distance",
                                            onClick: ()=>autoCalcDistance(hostelForm.university_id),
                                            style: {
                                                background: '#eff6ff',
                                                border: '1.5px solid #bfdbfe',
                                                borderRadius: '8px',
                                                padding: '0 10px',
                                                cursor: 'pointer',
                                                color: '#2563eb',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                whiteSpace: 'nowrap'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons-round",
                                                    style: {
                                                        fontSize: '14px'
                                                    },
                                                    children: "straighten"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                                    lineNumber: 633,
                                                    columnNumber: 21
                                                }, this),
                                                "Calc"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                            lineNumber: 628,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 621,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Transport Notes",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    placeholder: "e.g. Bus 34 stops 200m away, TZS 300",
                                    value: hostelForm.transport_notes,
                                    onChange: (e)=>setHostelForm((f)=>({
                                                ...f,
                                                transport_notes: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 640,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 639,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Description",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "finput ftextarea",
                            placeholder: "Describe your hostel...",
                            value: hostelForm.description,
                            onChange: (e)=>setHostelForm((f)=>({
                                        ...f,
                                        description: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 646,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 645,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Amenities",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "amenity-picker",
                            children: AMENITIES.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `amenity-opt ${hostelForm.amenities.includes(a) ? 'selected' : ''}`,
                                    onClick: ()=>toggleAmenity(a),
                                    children: [
                                        hostelForm.amenities.includes(a) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons-round",
                                            style: {
                                                fontSize: '12px'
                                            },
                                            children: "check"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                            lineNumber: 652,
                                            columnNumber: 56
                                        }, this),
                                        a
                                    ]
                                }, a, true, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 651,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 649,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 648,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-acts",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-cancel",
                                onClick: ()=>setModal(null),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 659,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-primary",
                                disabled: actionLoading,
                                onClick: submitHostel,
                                children: actionLoading ? 'Saving...' : modal.type === 'edit_hostel' ? 'Save Changes' : 'Submit for Review'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 660,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 658,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 587,
                columnNumber: 9
            }, this),
            (modal?.type === 'add_room' || modal?.type === 'edit_room') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BigModal, {
                title: modal.type === 'edit_room' ? 'Edit Room' : 'Add Room',
                onClose: ()=>setModal(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-grid2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Room Label *",
                                hint: "e.g. A101, B205, Ground-03",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    placeholder: "A101",
                                    value: roomForm.room_label,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                room_label: e.target.value.toUpperCase()
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 672,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 671,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Floor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    placeholder: "Ground, 1st, 2nd...",
                                    value: roomForm.floor,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                floor: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 675,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 674,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 670,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Room Type *",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "type-picker",
                            children: ROOM_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: `type-opt ${roomForm.room_type === t ? 'selected' : ''}`,
                                    onClick: ()=>setRoomForm((f)=>({
                                                ...f,
                                                room_type: t,
                                                capacity: ROOM_CAPACITIES[t] || 1
                                            })),
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 681,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 679,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 678,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-grid3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Capacity (persons)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    type: "number",
                                    min: "1",
                                    max: "20",
                                    value: roomForm.capacity,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                capacity: parseInt(e.target.value) || 1
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 690,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 689,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Price / Semester (TZS) *",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    type: "number",
                                    placeholder: "400000",
                                    value: roomForm.price_per_semester,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                price_per_semester: e.target.value
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 693,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 692,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                                label: "Number of Rooms",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "finput",
                                    type: "number",
                                    min: "0",
                                    value: roomForm.available_count,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                available_count: parseInt(e.target.value) || 0
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 696,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 695,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 688,
                        columnNumber: 11
                    }, this),
                    roomForm.price_per_semester > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-hint",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons-round",
                                style: {
                                    fontSize: '14px'
                                },
                                children: "info"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 701,
                                columnNumber: 15
                            }, this),
                            "Deposit = ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    "TZS ",
                                    (parseFloat(roomForm.price_per_semester) * 0.5).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 702,
                                columnNumber: 25
                            }, this),
                            " (50%) \\u00b7 Per person, per semester"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 700,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Is Full?",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: '#475569'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: roomForm.available_count === 0 || roomForm.is_full,
                                    onChange: (e)=>setRoomForm((f)=>({
                                                ...f,
                                                is_full: e.target.checked,
                                                available_count: e.target.checked ? 0 : f.available_count || 1
                                            }))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                    lineNumber: 707,
                                    columnNumber: 15
                                }, this),
                                "Mark this room as full (no more bookings)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 706,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 705,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormField, {
                        label: "Description",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "finput ftextarea",
                            placeholder: "Additional details about this specific room...",
                            value: roomForm.description,
                            onChange: (e)=>setRoomForm((f)=>({
                                        ...f,
                                        description: e.target.value
                                    }))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 713,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 712,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-acts",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-cancel",
                                onClick: ()=>setModal(null),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 716,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-primary",
                                disabled: actionLoading,
                                onClick: submitRoom,
                                children: actionLoading ? 'Saving...' : modal.type === 'edit_room' ? 'Save Changes' : 'Add Room'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 717,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 715,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 669,
                columnNumber: 9
            }, this),
            modal?.type === 'delete_account' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Modal, {
                title: "Delete Account",
                onClose: ()=>setModal(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '8px 0 16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons-round",
                                style: {
                                    fontSize: '40px',
                                    color: '#ef4444',
                                    display: 'block',
                                    marginBottom: '12px'
                                },
                                children: "delete_forever"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 728,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '14px',
                                    color: '#475569',
                                    lineHeight: '1.7',
                                    marginBottom: '16px'
                                },
                                children: "This will permanently delete your account, all your properties, and cancel all pending bookings."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 729,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 727,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "modal-input",
                        type: "password",
                        placeholder: "Your password",
                        value: deletePassword,
                        onChange: (e)=>setDeletePassword(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 733,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-acts",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-cancel",
                                onClick: ()=>setModal(null),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 735,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "modal-danger",
                                disabled: actionLoading || !deletePassword,
                                onClick: deleteAccount,
                                children: actionLoading ? 'Deleting...' : 'Delete Forever'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 734,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 726,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
const Badge = ({ s })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: s.bg,
            color: s.color,
            padding: '3px 9px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            whiteSpace: 'nowrap'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: s.dot,
                    display: 'inline-block'
                }
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 748,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            s.label
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 747,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const FormField = ({ label, hint, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "form-field",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "form-label",
                children: [
                    label,
                    hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "form-hint",
                        children: [
                            " \\u2014 ",
                            hint
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                        lineNumber: 755,
                        columnNumber: 51
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 755,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 754,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function Modal({ title, children, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-head",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "modal-title",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 765,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-x",
                            onClick: onClose,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons-round",
                                style: {
                                    fontSize: '17px'
                                },
                                children: "close"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 766,
                                columnNumber: 57
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 766,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                    lineNumber: 764,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-body",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                    lineNumber: 768,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
            lineNumber: 763,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 762,
        columnNumber: 5
    }, this);
}
function BigModal({ title, children, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-overlay",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-box big",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-head",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "modal-title",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 779,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-x",
                            onClick: onClose,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons-round",
                                style: {
                                    fontSize: '17px'
                                },
                                children: "close"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                                lineNumber: 780,
                                columnNumber: 57
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                            lineNumber: 780,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                    lineNumber: 778,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-body modal-scroll",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                    lineNumber: 782,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
            lineNumber: 777,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 776,
        columnNumber: 5
    }, this);
}
const Spinner = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '24px',
            height: '24px',
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            margin: '0 auto'
        }
    }, void 0, false, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 788,
        columnNumber: 23
    }, ("TURBOPACK compile-time value", void 0));
const Loader = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#f8fafc'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 789,
                columnNumber: 135
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `@keyframes spin{to{transform:rotate(360deg);}}`
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
                lineNumber: 789,
                columnNumber: 145
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/dormlink/frontend/app/host/dashboard/page.js",
        lineNumber: 789,
        columnNumber: 22
    }, ("TURBOPACK compile-time value", void 0));
const CSS = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Inter',sans-serif;background:#f8fafc;color:#0f172a;font-size:14px;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}

  .layout{display:flex;min-height:100vh;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:99;backdrop-filter:blur(2px);}

  .sidebar{width:236px;background:white;border-right:1px solid #f1f5f9;display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;transition:transform 0.25s cubic-bezier(.4,0,.2,1);}
  .sb-brand{display:flex;align-items:center;gap:8px;padding:18px 16px 14px;border-bottom:1px solid #f8fafc;}
  .sb-logo{width:28px;height:28px;background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .sb-name{font-size:15px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;}
  .sb-user{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #f8fafc;}
  .sb-av{width:34px;height:34px;background:linear-gradient(135deg,#f0fdf4,#bbf7d0);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#166534;flex-shrink:0;}
  .sb-fullname{font-size:13px;font-weight:600;color:#0f172a;}
  .sb-tag{font-size:10px;color:#94a3b8;margin-top:1px;text-transform:uppercase;letter-spacing:0.5px;}
  .sb-nav{padding:10px 8px;flex:1;}
  .sb-btn{display:flex;align-items:center;gap:8px;width:100%;padding:9px 10px;border-radius:8px;border:none;background:none;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#64748b;cursor:pointer;transition:all 0.15s;text-align:left;}
  .sb-btn:hover{background:#f8fafc;color:#0f172a;}
  .sb-btn.active{background:#eff6ff;color:#1d4ed8;font-weight:600;}
  .sb-icon{font-size:17px!important;}
  .sb-count{background:#ef4444;color:white;border-radius:20px;padding:1px 6px;font-size:10px;font-weight:700;margin-left:auto;}
  .sb-foot{padding:12px;border-top:1px solid #f8fafc;}
  .sb-signout{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;background:none;border:1px solid #f1f5f9;padding:8px;border-radius:8px;font-size:12px;font-weight:500;color:#94a3b8;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .sb-signout:hover{border-color:#ef4444;color:#ef4444;}

  .main{margin-left:236px;flex:1;display:flex;flex-direction:column;}
  .topbar{background:white;border-bottom:1px solid #f1f5f9;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:50;}
  .tb-left{display:flex;align-items:center;gap:10px;}
  .tb-title{font-size:14px;font-weight:600;color:#0f172a;}
  .hamburger{display:none;background:none;border:none;cursor:pointer;color:#64748b;padding:2px;}
  .back-btn{display:flex;align-items:center;background:#f1f5f9;border:none;border-radius:7px;padding:5px;cursor:pointer;color:#475569;transition:all 0.15s;}
  .back-btn:hover{background:#e2e8f0;}
  .tb-cta{display:inline-flex;align-items:center;gap:6px;background:#0f172a;color:white;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .tb-cta:hover{background:#1e293b;}

  .content{padding:24px;flex:1;animation:fadeIn 0.3s ease;}

  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
  .stat{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:16px;transition:all 0.2s;}
  .stat:hover{border-color:#e2e8f0;box-shadow:0 2px 10px rgba(0,0,0,0.04);}
  .stat.good{border-color:#d1fae5;background:#f0fdf4;}
  .stat.warn{border-color:#fde68a;background:#fffbeb;}
  .stat-icon{font-size:18px!important;color:#94a3b8;margin-bottom:10px;display:block;}
  .stat.good .stat-icon{color:#10b981;}
  .stat.warn .stat-icon{color:#f59e0b;}
  .stat-n{font-size:24px;font-weight:700;color:#0f172a;letter-spacing:-0.5px;}
  .stat-l{font-size:12px;color:#94a3b8;margin-top:2px;}

  .panel{background:white;border:1px solid #f1f5f9;border-radius:12px;overflow:hidden;}
  .panel-hd{padding:16px 20px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;}
  .panel-title{font-size:14px;font-weight:600;color:#0f172a;}
  .panel-sub{font-size:12px;color:#94a3b8;}

  .hostel-list{divide-y:1px solid #f1f5f9;}
  .hostel-row{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid #f9fafb;transition:background 0.15s;}
  .hostel-row:last-child{border-bottom:none;}
  .hostel-row:hover{background:#fafafa;}
  .hostel-row-left{display:flex;align-items:center;gap:12px;flex:1;}
  .hostel-icon{width:38px;height:38px;background:#f1f5f9;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .hostel-name{font-size:13px;font-weight:600;color:#0f172a;}
  .hostel-meta{font-size:12px;color:#94a3b8;margin-top:2px;display:flex;align-items:center;gap:4px;flex-wrap:wrap;}
  .hostel-row-right{display:flex;align-items:center;gap:8px;}

  .hostel-summary-bar{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;}

  /* ROOMS GRID */
  .rooms-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;}
  .room-tile{background:white;border:1px solid #f1f5f9;border-radius:12px;padding:14px;transition:all 0.2s;position:relative;}
  .room-tile:hover{border-color:#e2e8f0;box-shadow:0 3px 12px rgba(0,0,0,0.06);}
  .room-tile.full{opacity:0.65;background:#f8fafc;}
  .room-tile.add-room-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border-style:dashed;min-height:120px;}
  .room-tile.add-room-tile:hover{border-color:#93c5fd;background:#eff6ff;}
  .room-tile-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
  .room-label-badge{background:#0f172a;color:white;padding:3px 9px;border-radius:5px;font-size:12px;font-weight:700;letter-spacing:0.3px;font-family:monospace;}
  .room-status-badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;}
  .room-status-badge.full{background:#fee2e2;color:#991b1b;}
  .room-status-badge.avail{background:#d1fae5;color:#065f46;}
  .room-tile-type{font-size:13px;font-weight:600;color:#0f172a;margin-bottom:2px;}
  .room-tile-meta{font-size:11px;color:#94a3b8;margin-bottom:8px;}
  .room-tile-info{display:flex;flex-direction:column;gap:4px;margin-bottom:8px;}
  .room-info-item{display:flex;align-items:center;gap:5px;font-size:12px;color:#475569;}
  .room-tile-desc{font-size:12px;color:#94a3b8;margin-bottom:8px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .room-features{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
  .room-feat-chip{background:#f1f5f9;color:#64748b;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:500;}
  .room-tile-actions{display:flex;gap:6px;}

  .badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;}
  .act-row{display:flex;gap:4px;flex-wrap:wrap;}
  .act-btn{border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;text-decoration:none;display:inline-flex;align-items:center;gap:3px;white-space:nowrap;}
  .act-btn.blue{background:#dbeafe;color:#1e3a8a;}
  .act-btn.blue:hover{background:#bfdbfe;}
  .act-btn.green{background:#d1fae5;color:#065f46;}
  .act-btn.green:hover{background:#a7f3d0;}
  .act-btn.red{background:#fee2e2;color:#991b1b;}
  .act-btn.red:hover{background:#fecaca;}
  .act-btn.gray{background:#f1f5f9;color:#475569;}
  .act-btn.gray:hover{background:#e2e8f0;}

  .tbl-wrap{overflow-x:auto;}
  .tbl{width:100%;border-collapse:collapse;}
  .tbl th{text-align:left;font-size:11px;font-weight:600;color:#94a3b8;letter-spacing:0.5px;text-transform:uppercase;padding:10px 16px;background:#fafafa;border-bottom:1px solid #f1f5f9;white-space:nowrap;}
  .tbl td{padding:12px 16px;border-bottom:1px solid #f9fafb;vertical-align:middle;}
  .tbl tr:last-child td{border-bottom:none;}
  .tbl tr:hover td{background:#fafafa;}
  .tbl tr.highlight td{background:#fffbeb;}
  .cell-main{font-size:13px;font-weight:500;color:#0f172a;}
  .cell-sub{font-size:12px;color:#94a3b8;margin-top:2px;}
  td.cell-main{font-size:13px;font-weight:500;color:#0f172a;}
  td.cell-sub{font-size:12px;color:#94a3b8;}

  .mobile-cards{display:none;}
  .m-card{padding:16px;border-bottom:1px solid #f1f5f9;}
  .m-card:last-child{border-bottom:none;}
  .m-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;}
  .m-hostel{font-size:14px;font-weight:600;color:#0f172a;}
  .m-room{font-size:12px;color:#94a3b8;margin-top:2px;}
  .m-actions{display:flex;gap:6px;}

  .empty{padding:48px;text-align:center;color:#94a3b8;font-size:13px;}
  .btn-primary{display:inline-flex;align-items:center;background:#0f172a;color:white;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-primary:hover{background:#1e293b;}

  .acct-section{margin-bottom:24px;padding-bottom:24px;border-bottom:1px solid #f1f5f9;}
  .acct-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
  .acct-section-title{font-size:12px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;}
  .acct-info-row{display:flex;align-items:center;gap:12px;}
  .danger-zone{background:#fff5f5;border:1px solid #fee2e2;border-radius:10px;padding:16px;}
  .btn-danger-outline{display:inline-flex;align-items:center;gap:6px;background:white;border:1.5px solid #ef4444;color:#ef4444;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .btn-danger-outline:hover{background:#fee2e2;}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);}
  .modal-box{background:white;border-radius:14px;width:100%;max-width:400px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);}
  .modal-box.big{max-width:640px;}
  .modal-head{display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-bottom:1px solid #f1f5f9;}
  .modal-title{font-size:14px;font-weight:600;color:#0f172a;}
  .modal-x{background:#f1f5f9;border:none;width:26px;height:26px;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#64748b;}
  .modal-body{padding:18px;}
  .modal-scroll{max-height:80vh;overflow-y:auto;}
  .modal-input{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:10px 12px;font-size:14px;font-family:'Inter',sans-serif;outline:none;background:#f9fafb;margin-bottom:4px;transition:border 0.15s;}
  .modal-input:focus{border-color:#2563eb;background:white;}
  .modal-acts{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;}
  .modal-cancel{background:#f1f5f9;color:#475569;border:none;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-cancel:hover{background:#e2e8f0;}
  .modal-primary{background:#0f172a;color:white;border:none;padding:9px 20px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-primary:hover{background:#1e293b;}
  .modal-primary:disabled{opacity:0.5;cursor:not-allowed;}
  .modal-danger{background:#ef4444;color:white;border:none;padding:9px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;}
  .modal-danger:hover{background:#dc2626;}
  .modal-danger:disabled{opacity:0.5;cursor:not-allowed;}

  /* FORM */
  .form-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .form-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
  .form-field{margin-bottom:14px;}
  .form-label{display:block;font-size:12px;font-weight:600;color:#374151;margin-bottom:5px;}
  .form-hint{font-weight:400;color:#94a3b8;}
  .finput{width:100%;border:1.5px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:13px;font-family:'Inter',sans-serif;outline:none;background:#f9fafb;transition:border 0.15s;color:#0f172a;}
  .finput:focus{border-color:#2563eb;background:white;}
  .ftextarea{min-height:72px;resize:vertical;}
  .amenity-picker{display:flex;flex-wrap:wrap;gap:6px;}
  .amenity-opt{border:1.5px solid #e2e8f0;background:#f9fafb;border-radius:7px;padding:5px 12px;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;display:flex;align-items:center;gap:4px;}
  .amenity-opt:hover{border-color:#93c5fd;color:#1d4ed8;}
  .amenity-opt.selected{border-color:#2563eb;background:#eff6ff;color:#1d4ed8;font-weight:600;}
  .type-picker{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}
  .type-opt{border:1.5px solid #e2e8f0;background:#f9fafb;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:500;color:#64748b;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.15s;text-align:center;}
  .type-opt:hover{border-color:#93c5fd;color:#1d4ed8;}
  .type-opt.selected{border-color:#2563eb;background:#eff6ff;color:#1d4ed8;font-weight:600;}
  .price-hint{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:8px 12px;font-size:12px;color:#1d4ed8;margin-bottom:12px;display:flex;align-items:center;gap:6px;}

  @media(max-width:1024px){.stats{grid-template-columns:repeat(2,1fr);}.form-grid3{grid-template-columns:1fr 1fr;}.rooms-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));}}
  @media(max-width:768px){
    .sidebar{transform:translateX(-100%);}
    .sidebar.open{transform:translateX(0);}
    .main{margin-left:0;}
    .hamburger{display:flex;}
    .content{padding:16px;}
    .topbar{padding:0 14px;}
    .stats{grid-template-columns:repeat(2,1fr);gap:10px;}
    .tbl-wrap{display:none;}
    .mobile-cards{display:block;}
    .form-grid2,.form-grid3{grid-template-columns:1fr;}
    .type-picker{grid-template-columns:1fr 1fr;}
    .rooms-grid{grid-template-columns:repeat(2,1fr);}
    .hostel-row-right{flex-direction:column;align-items:flex-end;gap:6px;}
  }
  @media(max-width:400px){.rooms-grid{grid-template-columns:1fr;}}
`;
}),
];

//# sourceMappingURL=Desktop_dormlink_frontend_app_host_dashboard_page_95603df6.js.map