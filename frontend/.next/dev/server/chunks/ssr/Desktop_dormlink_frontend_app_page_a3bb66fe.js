module.exports = [
"[project]/Desktop/dormlink/frontend/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/context/AuthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dormlink/frontend/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const TANZANIA_UNIVERSITIES = [
    {
        name: 'University of Dar es Salaam',
        short: 'UDSM',
        location: 'Dar es Salaam'
    },
    {
        name: 'UDSM College of Engineering',
        short: 'CoET',
        location: 'Dar es Salaam'
    },
    {
        name: 'Muhimbili University of Health Sciences',
        short: 'MUHAS',
        location: 'Dar es Salaam'
    },
    {
        name: 'Dar es Salaam Institute of Technology',
        short: 'DIT',
        location: 'Dar es Salaam'
    },
    {
        name: 'Institute of Finance Management',
        short: 'IFM',
        location: 'Dar es Salaam'
    },
    {
        name: 'Institute of Social Work',
        short: 'ISW',
        location: 'Dar es Salaam'
    },
    {
        name: 'College of Business Education',
        short: 'CBE Dar',
        location: 'Dar es Salaam'
    },
    {
        name: 'CBE Dodoma Campus',
        short: 'CBE Dodoma',
        location: 'Dodoma'
    },
    {
        name: 'Ardhi University',
        short: 'ARU',
        location: 'Dar es Salaam'
    },
    {
        name: 'Open University of Tanzania',
        short: 'OUT',
        location: 'Dar es Salaam'
    },
    {
        name: 'University of Dodoma',
        short: 'UDOM',
        location: 'Dodoma'
    },
    {
        name: 'Sokoine University of Agriculture',
        short: 'SUA',
        location: 'Morogoro'
    },
    {
        name: 'Mzumbe University',
        short: 'MU',
        location: 'Morogoro'
    },
    {
        name: 'Mzumbe University Dar Campus',
        short: 'MU Dar',
        location: 'Dar es Salaam'
    },
    {
        name: 'Mzumbe University Mbeya Campus',
        short: 'MU Mbeya',
        location: 'Mbeya'
    },
    {
        name: 'Nelson Mandela African Institution',
        short: 'NM-AIST',
        location: 'Arusha'
    },
    {
        name: 'Moshi Co-operative University',
        short: 'MoCU',
        location: 'Moshi'
    },
    {
        name: 'Kilimanjaro Christian Medical University',
        short: 'KCMUCo',
        location: 'Moshi'
    },
    {
        name: 'St. Augustine University',
        short: 'SAUT',
        location: 'Mwanza'
    },
    {
        name: 'SAUT Dar es Salaam Campus',
        short: 'SAUT Dar',
        location: 'Dar es Salaam'
    },
    {
        name: 'University of Mwanza',
        short: 'UNIMA',
        location: 'Mwanza'
    },
    {
        name: 'Bugando Medical Centre University',
        short: 'BUGANDO',
        location: 'Mwanza'
    },
    {
        name: 'Kampala International University Tanzania',
        short: 'KIU-T',
        location: 'Dar es Salaam'
    },
    {
        name: 'Tumaini University Makumira',
        short: 'TUMA',
        location: 'Arusha'
    },
    {
        name: 'Tumaini University Dar Campus',
        short: 'TUMA Dar',
        location: 'Dar es Salaam'
    },
    {
        name: 'Iringa University',
        short: 'UniIringa',
        location: 'Iringa'
    },
    {
        name: 'Ruaha Catholic University',
        short: 'RUCU',
        location: 'Iringa'
    },
    {
        name: 'Sebastian Kolowa Memorial University',
        short: 'SEKOMU',
        location: 'Lushoto'
    },
    {
        name: 'Stefano Moshi Memorial University',
        short: 'SMMUCo',
        location: 'Moshi'
    },
    {
        name: 'Mount Meru University',
        short: 'MMU',
        location: 'Arusha'
    },
    {
        name: 'Arusha Technical College',
        short: 'ATC',
        location: 'Arusha'
    },
    {
        name: 'Tanzania Institute of Accountancy',
        short: 'TIA',
        location: 'Dar es Salaam'
    },
    {
        name: 'TIA Mwanza Campus',
        short: 'TIA Mwanza',
        location: 'Mwanza'
    },
    {
        name: 'TIA Arusha Campus',
        short: 'TIA Arusha',
        location: 'Arusha'
    },
    {
        name: 'Tanzania Commission for Universities',
        short: 'TCU',
        location: 'Dar es Salaam'
    },
    {
        name: 'Zanzibar University',
        short: 'ZU',
        location: 'Zanzibar'
    },
    {
        name: 'State University of Zanzibar',
        short: 'SUZA',
        location: 'Zanzibar'
    },
    {
        name: 'Aga Khan University Tanzania',
        short: 'AKU',
        location: 'Dar es Salaam'
    },
    {
        name: 'International Medical & Technological University',
        short: 'IMTU',
        location: 'Dar es Salaam'
    },
    {
        name: 'Muslim University of Morogoro',
        short: 'MUM',
        location: 'Morogoro'
    },
    {
        name: 'Mkwawa University College of Education',
        short: 'MUCE',
        location: 'Iringa'
    },
    {
        name: 'University of Bagamoyo',
        short: 'UB',
        location: 'Bagamoyo'
    },
    {
        name: 'Geita Gold Mining Institute',
        short: 'GGMI',
        location: 'Geita'
    },
    {
        name: 'Mbeya University of Science & Technology',
        short: 'MUST',
        location: 'Mbeya'
    }
];
function HomePage() {
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$context$2f$AuthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [hostels, setHostels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [universities, setUniversities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showDropdown, setShowDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedUniversity, setSelectedUniversity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filteredHostels, setFilteredHostels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleClickOutside = (e)=>{
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };
    const fetchData = async ()=>{
        try {
            const [hostelsRes, unisRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/hostels/approved'),
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/hostels/universities')
            ]);
            setHostels(hostelsRes.data.hostels || []);
            setFilteredHostels(hostelsRes.data.hostels || []);
            setUniversities(unisRes.data.universities || []);
        } catch (e) {
            console.error(e);
        } finally{
            setLoading(false);
        }
    };
    const handleSearch = (q)=>{
        setSearchQuery(q);
        if (!q.trim()) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        const results = TANZANIA_UNIVERSITIES.filter((u)=>u.name.toLowerCase().includes(q.toLowerCase()) || u.short.toLowerCase().includes(q.toLowerCase()) || u.location.toLowerCase().includes(q.toLowerCase()));
        setSearchResults(results);
        setShowDropdown(true);
    };
    const selectUniversity = (uni)=>{
        setSelectedUniversity(uni);
        setSearchQuery(uni.name);
        setShowDropdown(false);
        const filtered = hostels.filter((h)=>h.universities?.name?.toLowerCase().includes(uni.short.toLowerCase()) || h.universities?.name?.toLowerCase().includes(uni.name.toLowerCase()) || h.university_name?.toLowerCase().includes(uni.name.toLowerCase()) || h.city?.toLowerCase().includes(uni.location.toLowerCase()));
        setFilteredHostels(filtered.length > 0 ? filtered : hostels);
    };
    const clearSearch = ()=>{
        setSearchQuery('');
        setSelectedUniversity(null);
        setFilteredHostels(hostels);
        setShowDropdown(false);
    };
    const groupedByLocation = ()=>{
        const groups = {};
        filteredHostels.forEach((h)=>{
            const loc = h.city || 'Other';
            if (!groups[loc]) groups[loc] = [];
            groups[loc].push(h);
        });
        return groups;
    };
    const getTimeAgo = (dateStr)=>{
        if (!dateStr) return '';
        const diff = Date.now() - new Date(dateStr);
        const days = Math.floor(diff / 86400000);
        if (days === 0) return 'Added today';
        if (days === 1) return 'Added yesterday';
        if (days < 7) return `Added ${days} days ago`;
        if (days < 30) return `Added ${Math.floor(days / 7)} weeks ago`;
        return `Added ${Math.floor(days / 30)} months ago`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --blue:#2563eb;--blue-light:#eff6ff;--blue-mid:#bfdbfe;
          --navy:#0f172a;--text:#1e293b;--muted:#64748b;--border:#e2e8f0;
          --white:#ffffff;--bg:#f8fafc;--radius:16px;
        }
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
        
        /* NAV */
        .nav{background:white;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:200;height:64px;}
        .nav-inner{max-width:1280px;margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;}
        .logo{font-family:'Sora',sans-serif;font-size:22px;font-weight:800;color:var(--blue);text-decoration:none;display:flex;align-items:center;gap:8px;flex-shrink:0;}
        .logo-icon{width:34px;height:34px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:10px;display:flex;align-items:center;justify-content:center;}
        .nav-search{flex:1;max-width:480px;position:relative;}
        .nav-search input{width:100%;border:1.5px solid var(--border);border-radius:50px;padding:10px 20px 10px 44px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:all 0.2s;background:var(--bg);}
        .nav-search input:focus{border-color:var(--blue);background:white;box-shadow:0 0 0 3px rgba(37,99,235,0.1);}
        .nav-search .search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:20px;}
        .nav-search .clear-btn{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--muted);display:flex;align-items:center;}
        .nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0;}
        .btn-nav{border:1.5px solid var(--border);background:white;padding:8px 18px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;color:var(--text);text-decoration:none;transition:all 0.2s;white-space:nowrap;}
        .btn-nav:hover{background:var(--bg);}
        .btn-nav-primary{background:var(--blue);color:white;border-color:var(--blue);}
        .btn-nav-primary:hover{background:#1d4ed8;}
        .mobile-menu-btn{display:none;background:none;border:none;cursor:pointer;color:var(--text);}

        /* HERO */
        .hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 50%,#bfdbfe 100%);padding:64px 24px 80px;text-align:center;position:relative;overflow:hidden;}
        .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
        .hero-inner{max-width:700px;margin:0 auto;position:relative;}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:white;border:1px solid var(--blue-mid);color:var(--blue);padding:6px 16px;border-radius:50px;font-size:13px;font-weight:600;margin-bottom:24px;box-shadow:0 2px 8px rgba(37,99,235,0.12);}
        .hero h1{font-family:'Sora',sans-serif;font-size:clamp(32px,6vw,56px);font-weight:800;color:var(--navy);line-height:1.1;margin-bottom:16px;}
        .hero h1 span{color:var(--blue);}
        .hero p{font-size:clamp(15px,2vw,18px);color:var(--muted);margin-bottom:36px;line-height:1.7;}
        
        /* SEARCH BOX */
        .search-box{background:white;border-radius:20px;padding:8px;box-shadow:0 8px 40px rgba(37,99,235,0.15);display:flex;align-items:center;gap:8px;max-width:640px;margin:0 auto;border:1px solid var(--blue-mid);}
        .search-box-input{flex:1;border:none;outline:none;padding:12px 16px;font-size:15px;font-family:'DM Sans',sans-serif;color:var(--text);background:none;}
        .search-box-input::placeholder{color:var(--muted);}
        .search-box-btn{background:var(--blue);color:white;border:none;padding:12px 24px;border-radius:14px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:8px;white-space:nowrap;transition:all 0.2s;}
        .search-box-btn:hover{background:#1d4ed8;transform:translateY(-1px);}

        /* DROPDOWN */
        .search-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;background:white;border:1px solid var(--border);border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,0.12);z-index:300;max-height:320px;overflow-y:auto;}
        .dropdown-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:background 0.15s;}
        .dropdown-item:hover{background:var(--blue-light);}
        .dropdown-item:first-child{border-radius:16px 16px 0 0;}
        .dropdown-item:last-child{border-radius:0 0 16px 16px;}
        .dropdown-badge{background:var(--blue-light);color:var(--blue);padding:3px 10px;border-radius:50px;font-size:11px;font-weight:700;flex-shrink:0;}
        .dropdown-name{font-size:14px;font-weight:600;color:var(--text);}
        .dropdown-loc{font-size:12px;color:var(--muted);}

        /* UNIVERSITY CHIPS */
        .uni-scroll{padding:20px 24px;background:white;border-bottom:1px solid var(--border);overflow-x:auto;white-space:nowrap;scrollbar-width:none;}
        .uni-scroll::-webkit-scrollbar{display:none;}
        .uni-chips{display:inline-flex;gap:10px;max-width:1280px;margin:0 auto;}
        .uni-chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border:1.5px solid var(--border);border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s;background:white;color:var(--muted);font-family:'DM Sans',sans-serif;}
        .uni-chip:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-light);}
        .uni-chip.active{background:var(--blue);color:white;border-color:var(--blue);}

        /* CONTENT */
        .content{max-width:1280px;margin:0 auto;padding:32px 24px;}
        .section{margin-bottom:48px;}
        .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
        .section-title{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;color:var(--navy);}
        .section-sub{font-size:13px;color:var(--muted);margin-top:2px;}
        .see-all{font-size:13px;font-weight:700;color:var(--blue);text-decoration:none;}
        .see-all:hover{text-decoration:underline;}

        /* GRID */
        .hostel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;}

        /* CARD */
        .hostel-card{background:white;border-radius:var(--radius);overflow:hidden;border:1px solid var(--border);transition:all 0.25s;cursor:pointer;text-decoration:none;display:block;}
        .hostel-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(37,99,235,0.12);border-color:var(--blue-mid);}
        .card-img{height:200px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);position:relative;overflow:hidden;}
        .card-img img{width:100%;height:100%;object-fit:cover;}
        .card-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#eff6ff,#dbeafe);}
        .card-badge{position:absolute;top:12px;left:12px;background:white;border-radius:50px;padding:4px 12px;font-size:11px;font-weight:700;color:var(--blue);box-shadow:0 2px 8px rgba(0,0,0,0.1);}
        .card-time{position:absolute;top:12px;right:12px;background:rgba(15,23,42,0.7);backdrop-filter:blur(8px);border-radius:50px;padding:4px 10px;font-size:11px;font-weight:500;color:white;}
        .card-body{padding:16px;}
        .card-uni{font-size:11px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;display:flex;align-items:center;gap:4px;}
        .card-name{font-family:'Sora',sans-serif;font-size:16px;font-weight:700;color:var(--navy);margin-bottom:4px;line-height:1.3;}
        .card-location{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:4px;margin-bottom:12px;}
        .card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border);}
        .card-price{font-family:'Sora',sans-serif;font-size:17px;font-weight:800;color:var(--navy);}
        .card-price-label{font-size:11px;color:var(--muted);font-weight:400;}
        .card-rooms{background:var(--blue-light);color:var(--blue);padding:4px 10px;border-radius:50px;font-size:12px;font-weight:600;}

        /* AMENITY PILLS */
        .amenity-pills{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;}
        .amenity-pill{background:var(--bg);border:1px solid var(--border);color:var(--muted);padding:3px 10px;border-radius:50px;font-size:11px;}

        /* EMPTY */
        .empty{text-align:center;padding:80px 24px;}
        .empty-icon{width:72px;height:72px;background:var(--blue-light);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
        .empty h3{font-family:'Sora',sans-serif;font-size:20px;font-weight:700;color:var(--navy);margin-bottom:8px;}
        .empty p{color:var(--muted);font-size:15px;}

        /* STATS BAR */
        .stats-bar{background:var(--navy);color:white;padding:20px 24px;}
        .stats-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-around;gap:24px;flex-wrap:wrap;}
        .stat{text-align:center;}
        .stat-num{font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:white;}
        .stat-label{font-size:13px;color:rgba(255,255,255,0.5);margin-top:2px;}

        /* LOADING */
        .loading{display:flex;align-items:center;justify-content:center;min-height:300px;gap:12px;color:var(--muted);}
        .spinner{width:28px;height:28px;border:3px solid var(--blue-mid);border-top-color:var(--blue);border-radius:50%;animation:spin 0.8s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg);}}

        /* MOBILE NAV MENU */
        .mobile-menu{position:fixed;inset:0;background:white;z-index:500;padding:24px;display:flex;flex-direction:column;gap:16px;transform:translateX(100%);transition:transform 0.3s;}
        .mobile-menu.open{transform:translateX(0);}
        .mobile-menu-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}

        /* RESPONSIVE */
        @media(max-width:768px){
          .nav-search{display:none;}
          .mobile-menu-btn{display:flex;}
          .btn-nav{display:none;}
          .btn-nav.mobile-show{display:flex;}
          .hero{padding:40px 20px 56px;}
          .search-box{flex-direction:column;padding:12px;}
          .search-box-btn{width:100%;justify-content:center;}
          .hostel-grid{grid-template-columns:1fr;}
          .content{padding:24px 16px;}
          .stats-inner{gap:16px;}
          .stat-num{font-size:22px;}
        }
        @media(max-width:480px){
          .hostel-grid{grid-template-columns:1fr;}
          .section-title{font-size:18px;}
        }

        /* FILTER ACTIVE BAR */
        .filter-bar{background:var(--blue-light);border-bottom:1px solid var(--blue-mid);padding:12px 24px;}
        .filter-bar-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;}
        .filter-text{font-size:14px;font-weight:600;color:var(--blue);}
        .filter-clear{background:var(--blue);color:white;border:none;padding:6px 16px;border-radius:50px;font-size:12px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;}

        /* SCROLL CARDS (horizontal) */
        .scroll-section{overflow-x:auto;scrollbar-width:none;margin:0 -24px;padding:0 24px;}
        .scroll-section::-webkit-scrollbar{display:none;}
        .scroll-cards{display:flex;gap:20px;width:max-content;padding-bottom:4px;}
        .scroll-cards .hostel-card{width:280px;flex-shrink:0;}
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "nav",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "nav-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "logo",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "logo-icon",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
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
                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                lineNumber: 309,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M9 22V12h6v10",
                                                stroke: "white",
                                                strokeWidth: "2.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                "DormLink"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "nav-search",
                            ref: searchRef,
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round search-icon",
                                    children: "search"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    placeholder: "Search university or location...",
                                    value: searchQuery,
                                    onChange: (e)=>handleSearch(e.target.value),
                                    onFocus: ()=>searchQuery && setShowDropdown(true)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "clear-btn",
                                    onClick: clearSearch,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons-round",
                                        style: {
                                            fontSize: '18px'
                                        },
                                        children: "close"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this),
                                showDropdown && searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-dropdown",
                                    children: searchResults.map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dropdown-item",
                                            onClick: ()=>selectUniversity(u),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons-round",
                                                    style: {
                                                        color: '#2563eb',
                                                        fontSize: '20px'
                                                    },
                                                    children: "school"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 333,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dropdown-name",
                                                            children: u.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dropdown-loc",
                                                            children: u.location
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                            lineNumber: 336,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 334,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "dropdown-badge",
                                                    children: u.short
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 338,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 332,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "nav-right",
                            children: [
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${user.role}/dashboard`,
                                            className: "btn-nav",
                                            children: "Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn-nav btn-nav-primary",
                                            onClick: logout,
                                            children: "Sign Out"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 349,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "btn-nav",
                                            children: "Log In"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            className: "btn-nav btn-nav-primary",
                                            children: "Sign Up"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "mobile-menu-btn",
                                    onClick: ()=>setMenuOpen(true),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons-round",
                                        children: "menu"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 357,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                    lineNumber: 305,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 304,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mobile-menu ${menuOpen ? 'open' : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-menu-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'Sora',
                                    fontWeight: 800,
                                    fontSize: '20px',
                                    color: '#2563eb'
                                },
                                children: "DormLink"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                },
                                onClick: ()=>setMenuOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    children: "close"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 369,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: {
                            width: '100%',
                            border: '1.5px solid #e2e8f0',
                            borderRadius: '50px',
                            padding: '12px 20px',
                            fontSize: '14px',
                            outline: 'none',
                            fontFamily: 'DM Sans,sans-serif'
                        },
                        placeholder: "Search university...",
                        value: searchQuery,
                        onChange: (e)=>{
                            handleSearch(e.target.value);
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    searchResults.length > 0 && searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            overflow: 'hidden'
                        },
                        children: searchResults.slice(0, 6).map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '12px 16px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #f1f4f9'
                                },
                                onClick: ()=>{
                                    selectUniversity(u);
                                    setMenuOpen(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontWeight: 600,
                                            fontSize: '14px'
                                        },
                                        children: u.name
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 383,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '12px',
                                            color: '#64748b'
                                        },
                                        children: u.location
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 384,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 381,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            marginTop: '8px'
                        },
                        children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${user.role}/dashboard`,
                                    className: "btn-nav",
                                    style: {
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px'
                                    },
                                    onClick: ()=>setMenuOpen(false),
                                    children: "My Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-nav btn-nav-primary",
                                    style: {
                                        padding: '12px',
                                        borderRadius: '50px'
                                    },
                                    onClick: ()=>{
                                        logout();
                                        setMenuOpen(false);
                                    },
                                    children: "Sign Out"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 393,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    className: "btn-nav",
                                    style: {
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px'
                                    },
                                    onClick: ()=>setMenuOpen(false),
                                    children: "Log In"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/register",
                                    className: "btn-nav btn-nav-primary",
                                    style: {
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px'
                                    },
                                    onClick: ()=>setMenuOpen(false),
                                    children: "Sign Up Free"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 398,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 389,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hero",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hero-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-badge",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        fontSize: '14px'
                                    },
                                    children: "verified"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, this),
                                "Tanzania's #1 Student Accommodation Platform"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: [
                                "Find Your Perfect ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Student Home"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 411,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Search hostels near your university across Tanzania. Book securely, pay safely, move in confidently."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 412,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "search-box",
                            ref: searchRef,
                            style: {
                                position: 'relative'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        color: '#2563eb',
                                        fontSize: '22px',
                                        flexShrink: 0,
                                        marginLeft: '8px'
                                    },
                                    children: "school"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "search-box-input",
                                    placeholder: "Search your university e.g. UDSM, UDOM, SUA...",
                                    value: searchQuery,
                                    onChange: (e)=>handleSearch(e.target.value),
                                    onFocus: ()=>searchQuery && setShowDropdown(true)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 415,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "search-box-btn",
                                    onClick: ()=>searchQuery && setShowDropdown(true),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons-round",
                                            style: {
                                                fontSize: '18px'
                                            },
                                            children: "search"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, this),
                                        "Search"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this),
                                showDropdown && searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "search-dropdown",
                                    style: {
                                        top: 'calc(100% + 8px)',
                                        left: 0,
                                        right: 0
                                    },
                                    children: searchResults.map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "dropdown-item",
                                            onClick: ()=>selectUniversity(u),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons-round",
                                                    style: {
                                                        color: '#2563eb',
                                                        fontSize: '20px'
                                                    },
                                                    children: "school"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 430,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dropdown-name",
                                                            children: u.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                            lineNumber: 432,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "dropdown-loc",
                                                            children: u.location
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                            lineNumber: 433,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 431,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "dropdown-badge",
                                                    children: u.short
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 435,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 429,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 427,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                    lineNumber: 406,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stats-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stats-inner",
                    children: [
                        {
                            num: `${hostels.length}+`,
                            label: 'Listed Hostels'
                        },
                        {
                            num: '44+',
                            label: 'Universities Covered'
                        },
                        {
                            num: '20+',
                            label: 'Cities in Tanzania'
                        },
                        {
                            num: '100%',
                            label: 'Verified Properties'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stat",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-num",
                                    children: s.num
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 454,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-label",
                                    children: s.label
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 455,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 453,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                    lineNumber: 446,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 445,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "uni-scroll",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "uni-chips",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `uni-chip ${!selectedUniversity ? 'active' : ''}`,
                            onClick: clearSearch,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        fontSize: '16px'
                                    },
                                    children: "apps"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 468,
                                    columnNumber: 13
                                }, this),
                                "All"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 464,
                            columnNumber: 11
                        }, this),
                        TANZANIA_UNIVERSITIES.slice(0, 20).map((u, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `uni-chip ${selectedUniversity?.short === u.short ? 'active' : ''}`,
                                onClick: ()=>selectUniversity(u),
                                children: u.short
                            }, i, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 472,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                    lineNumber: 463,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            selectedUniversity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "filter-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "filter-bar-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "filter-text",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        fontSize: '16px',
                                        verticalAlign: 'middle',
                                        marginRight: '6px'
                                    },
                                    children: "school"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this),
                                "Showing hostels near ",
                                selectedUniversity.name,
                                " · ",
                                filteredHostels.length,
                                " found"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "filter-clear",
                            onClick: clearSearch,
                            children: "Clear filter"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                            lineNumber: 491,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                    lineNumber: 486,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 485,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "content",
                children: [
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "loading",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "spinner"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 500,
                                columnNumber: 13
                            }, this),
                            "Finding hostels near you..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 499,
                        columnNumber: 11
                    }, this) : filteredHostels.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-icon",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons-round",
                                    style: {
                                        color: '#2563eb',
                                        fontSize: '32px'
                                    },
                                    children: "search_off"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                    lineNumber: 506,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 505,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "No hostels found"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 508,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "No hostels listed yet for this university. Check back soon or",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        style: {
                                            color: '#2563eb',
                                            fontWeight: 700
                                        },
                                        children: "list your property"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 509,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 504,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: Object.entries(groupedByLocation()).map(([city, cityHostels])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "section",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-header",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "section-title",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "material-icons-round",
                                                            style: {
                                                                fontSize: '20px',
                                                                verticalAlign: 'middle',
                                                                marginRight: '6px',
                                                                color: '#2563eb'
                                                            },
                                                            children: "location_on"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                            lineNumber: 521,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Hostels in ",
                                                        city
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 520,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "section-sub",
                                                    children: [
                                                        cityHostels.length,
                                                        " properties available"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                    lineNumber: 524,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                            lineNumber: 519,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "scroll-section",
                                        style: {
                                            display: 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 529,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hostel-grid",
                                        children: cityHostels.map((hostel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/hostels/${hostel.id}`,
                                                className: "hostel-card",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "card-img",
                                                        children: [
                                                            hostel.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: hostel.image_url,
                                                                alt: hostel.name,
                                                                loading: "lazy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 535,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-img-placeholder",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "material-icons-round",
                                                                    style: {
                                                                        fontSize: '48px',
                                                                        color: '#93c5fd'
                                                                    },
                                                                    children: "apartment"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                    lineNumber: 538,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 537,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-badge",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-icons-round",
                                                                        style: {
                                                                            fontSize: '10px',
                                                                            verticalAlign: 'middle',
                                                                            marginRight: '2px'
                                                                        },
                                                                        children: "verified"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 542,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Verified"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 541,
                                                                columnNumber: 25
                                                            }, this),
                                                            hostel.created_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-time",
                                                                children: getTimeAgo(hostel.created_at)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 546,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                        lineNumber: 533,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "card-body",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-uni",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-icons-round",
                                                                        style: {
                                                                            fontSize: '12px'
                                                                        },
                                                                        children: "school"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 551,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Near ",
                                                                    hostel.universities?.name || hostel.city
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 550,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-name",
                                                                children: hostel.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 554,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-location",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-icons-round",
                                                                        style: {
                                                                            fontSize: '14px'
                                                                        },
                                                                        children: "place"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 556,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    hostel.address,
                                                                    ", ",
                                                                    hostel.city,
                                                                    hostel.distance_from_university && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            marginLeft: '4px'
                                                                        },
                                                                        children: [
                                                                            "· ",
                                                                            hostel.distance_from_university,
                                                                            "km away"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 559,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 555,
                                                                columnNumber: 25
                                                            }, this),
                                                            hostel.amenities?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "amenity-pills",
                                                                children: [
                                                                    hostel.amenities.slice(0, 3).map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "amenity-pill",
                                                                            children: a
                                                                        }, i, false, {
                                                                            fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                            lineNumber: 565,
                                                                            columnNumber: 31
                                                                        }, this)),
                                                                    hostel.amenities.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "amenity-pill",
                                                                        children: [
                                                                            "+",
                                                                            hostel.amenities.length - 3,
                                                                            " more"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 568,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 563,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "card-footer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "card-price",
                                                                                children: [
                                                                                    "TZS ",
                                                                                    hostel.rooms?.[0]?.price_per_semester ? parseFloat(hostel.rooms[0].price_per_semester).toLocaleString() : hostel.rooms?.[0]?.price_per_month ? parseFloat(hostel.rooms[0].price_per_month * 4).toLocaleString() : '—',
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "card-price-label",
                                                                                        children: " /semester"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                                        lineNumber: 580,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                                lineNumber: 574,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    fontSize: '11px',
                                                                                    color: '#94a3b8',
                                                                                    marginTop: '2px'
                                                                                },
                                                                                children: "per person"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                                lineNumber: 582,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 573,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "card-rooms",
                                                                        children: [
                                                                            hostel.rooms?.length || 0,
                                                                            " room type",
                                                                            hostel.rooms?.length !== 1 ? 's' : ''
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                        lineNumber: 584,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                                lineNumber: 572,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                        lineNumber: 549,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, hostel.id, true, {
                                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                                lineNumber: 532,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                        lineNumber: 530,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, city, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 517,
                                columnNumber: 15
                            }, this))
                    }, void 0, false),
                    !user || user.role !== 'host' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
                            borderRadius: '20px',
                            padding: '40px',
                            textAlign: 'center',
                            marginTop: '32px',
                            color: 'white'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'Sora',
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    marginBottom: '8px'
                                },
                                children: "Are you a hostel owner?"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 600,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '15px',
                                    opacity: 0.8,
                                    marginBottom: '24px'
                                },
                                children: "List your property on DormLink and reach thousands of students across Tanzania"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 601,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                style: {
                                    background: 'white',
                                    color: '#1e3a8a',
                                    padding: '12px 32px',
                                    borderRadius: '50px',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    transition: 'all 0.2s'
                                },
                                children: "List Your Property Free →"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 602,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 599,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 497,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    background: ' #0f172a',
                    color: 'rgba(255,255,255,0.5)',
                    padding: '32px 24px',
                    textAlign: 'center',
                    marginTop: '48px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: 'Sora',
                            fontSize: '18px',
                            fontWeight: '800',
                            color: 'white',
                            marginBottom: '8px'
                        },
                        children: "DormLink"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '13px',
                            marginBottom: '16px'
                        },
                        children: "Tanzania's Student Accommodation Platform"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            fontSize: '13px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                style: {
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none'
                                },
                                children: "Login"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                style: {
                                    color: 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none'
                                },
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 616,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dormlink$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "© ",
                                    new Date().getFullYear(),
                                    " DormLink Tanzania"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                        lineNumber: 614,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/dormlink/frontend/app/page.js",
                lineNumber: 611,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=Desktop_dormlink_frontend_app_page_a3bb66fe.js.map