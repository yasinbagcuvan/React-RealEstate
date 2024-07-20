export const initialState ={
    ilanlar:[],
    ilanBaslik:"",
    ilanAciklama:"",
    ilanFiyat:"",
    ilanResmi:"",
    ilanKategorisi:"Kategori Seçiniz",
    ilanDaireTipi:"",
    kategoriler:[],
    daireTipi:[],
    secilenKategori:"Tüm Ilanlar",
    secilenDaireTipi:"Tümünü Göster",
    secilenIlan:"",
    search:""

}

export const reducer = (state, action) => {
    switch (action.type) {
        case "ilanBaslik":
            return { ...state, ilanBaslik: action.payload };
        case "ilanAciklama":
            return { ...state, ilanAciklama: action.payload };
        case "ilanFiyat":
            return { ...state, ilanFiyat: action.payload };
        case "ilanKategorisi":
            return { ...state, ilanKategorisi: action.payload };
        case "ilanDaireTipi":
            return { ...state, ilanDaireTipi: action.payload };
        case "ilanResmi":
            return { ...state, ilanResmi: action.payload };
        case "ilanEkle":
            const guncelİlanlar =[...state.ilanlar,action.yeni]
            return { ...state, ilanlar:guncelİlanlar };
        case "ilanDuzenle":
            const duzenleIlan = [state.ilanlar.map(ilan =>{
                if(ilan.id === state.secilenIlan.id){
                    return{...action.yeni}
                }
                else{
                    return{...ilan}
                }
            })]
            return { ...state, secilenIlan: action.payload };
        case "ilanSil":
            const guncelİlanlar1 = [...state.ilanlar.filter(ilan => ilan.id !== action.id)]
            return { ...state, ilanlar: guncelİlanlar1};
        case "ilanlariGetir":
            return { ...state, ilanlar: action.payload };
        case "kategorileriGetir":
            return { ...state, kategoriler: action.payload };
        case "daireTipleriGetir":
            return { ...state, daireTipi: action.payload };
        case "resetForm":
            return { ...state, ilanBaslik: "", ilanAciklama: "", ilanFiyat: "", ilanResmi: "", ilanKategorisi: "Seçiniz", ilanDaireTipi: "" };
        case "kartDuzenle":
            const editCard = state.ilanlar.find(item=> item.id === action.id)
            return{
                ...state,
                secilenIlan:editCard,
                ilanBaslik:editCard.ilanBaslik,
                ilanAciklama:editCard.ilanAciklama,
                ilanFiyat:editCard.ilanFiyat,
                ilanResmi: editCard.ilanResmi,
                ilanDaireTipi: editCard.ilanDaireTipi,
                ilanKategorisi:editCard.ilanKategorisi
            }
        case "search":
            return { ...state, search: action.payload };
        default:
            return state;
    }
};

