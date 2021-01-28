import React from 'react';
const Profile = React.lazy(() => import('../../components/auth/Profile'));
const ChangePassword = React.lazy(() => import('./../../components/auth/ChangePassword'));

const Dashboard = React.lazy(() => import('./views/mandatement/Mandatement'));
const initAC = React.lazy(() => import('./views/mandatement/madantementAC/initAC'));
const initBC = React.lazy(() => import('./views/mandatement/mandatementBC/initBC'));
const mandatviewbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/MandatViewsAllBC'))
const mandatviewac = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/MandatViewsAllAC'))
const mandatupdatebc = React.lazy(()=>import('./views/mandatement/mandatupdate/mandatupdateBC/mandatupdateBC'))
const mandatupdateac = React.lazy(()=>import('./views/mandatement/mandatupdate/mandatupdateAC/mandatupdateAC'))
const mandatementac = React.lazy(()=> import('./views/mandatement/madantementAC/mandatementAC'))
const mandatementbc = React.lazy(()=> import('./views/mandatement/mandatementBC/mandatementBC'))

const journalac = React.lazy(()=> import('./views/mandatement/Journal/JournalAC'))
const journalbc = React.lazy(()=> import('./views/mandatement/Journal/JournalBC'))



/*****************************************Mandatement Ac Pdf views ****************************************/
const acpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/AvisCreditPdf'))
const bengpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/BengPdf'))
const blpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/BlPdf'))
const borderaupdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/BordereauPdf'))
const fppdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/FproformatPdf'))
const fdpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/FdefinitivePdf'))
const pvpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/pvPdf'))
const mandatpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsAC/pdfViews/mandatPdf'))

/*****************************************Mandatement Bc Pdf views ****************************************/

const bcpdf = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/BonCaisse'))
const bengpdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/BengPdf'))
const blpdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/BlPdf'))
const borderaupdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/BordereauPdf'))
const fppdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/FproformatPdf'))
const fdpdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/FdefinitivePdf'))
const pvpdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/pvPdf'))
const mandatpdfbc = React.lazy(()=> import('./views/mandatement/mandat_views/mandat_viewsBC/pdfViews/mandatPdf'))



const routes = [
    { path: '/finance', exact: true, name:"Finance"},
    { path: '/finance/mandatement', name: 'Mandatement', component: Dashboard},
    { path: '/finance/mandatac', name: 'initAC', component: initAC},
    { path: '/finance/mandatbc', name: 'initBC', component: initBC},
    { path: '/finance/mandatviewbc/:id_Bc', name: 'MandatView_bon_caisse', component: mandatviewbc},
    { path: '/finance/mandatviewac/:id_Ac', name: 'MandatView_avis_credit', component: mandatviewac},
    { path: '/finance/mandatementac', name: 'Mandatement_Avis_Credit', component: mandatementac},
    { path: '/finance/mandatementbc', name: 'Mandatement_Bon_Caisse', component: mandatementbc},
    { path: '/finance/mandatupdateac/:id_Ac', name: 'Mandatement_Avis_Credit Update', component: mandatupdateac},
    { path: '/finance/mandatupdatebc/:id_Bc', name: 'Mandatement_Bon_Caisse Update ', component: mandatupdatebc},
    { path: '/finance/profil', name: 'Mon profil', component: Profile},
    { path: '/finance/journalac', name: 'Journal AC', component: journalac},
    { path: '/finance/journalbc', name: 'Journal BC', component: journalbc},
    { path: '/finance/changer-de-mot-de-passe',exact:true,name:'changerMotDePasse',component:ChangePassword},

    /***********************Mandatement Ac pdf routes********************************************************/
    { path: '/finance/aviscreditpdf/:idAC', name: 'Avis Credit', component: acpdf},
    { path: '/finance/bengpdf/:idBE', name: "Bon d'engagament", component: bengpdf},
    { path: '/finance/blpdf/:idBL', name: 'Bordereau de Livraison', component: blpdf},
    { path: '/finance/fppdf/:idFP', name: 'Facture Proformat', component: fppdf},
    { path: '/finance/fdpdf/:idFD', name: 'Facture Definitive', component: fdpdf},
    { path: '/finance/pvpdf/:idPV', name: 'Pv de Reception', component: pvpdf},
    { path: '/finance/bordereaupdf/:idBO', name: 'Bordereau de Transmission', component: borderaupdf},
    { path: '/finance/mandatpdf/:idM', name: 'Mandat', component: mandatpdf},
    /***********************Mandatement Bc pdf routes********************************************************/
    { path: '/finance/bcpdf/:idBC', name: 'Avis Credit', component: bcpdf},
    { path: '/finance/bengpdfbc/:idBE', name: "Bon d'engagament", component: bengpdfbc},
    { path: '/finance/blpdfbc/:idBL', name: 'Bordereau de Livraison', component: blpdfbc},
    { path: '/finance/fppdfbc/:idFP', name: 'Facture Proformat', component: fppdfbc},
    { path: '/finance/fdpdfbc/:idFD', name: 'Facture Definitive', component: fdpdfbc},
    { path: '/finance/pvpdfbc/:idPV', name: 'Pv de Reception', component: pvpdfbc},
    { path: '/finance/bordereaupdfbc/:idBO', name: 'Bordereau de Transmission', component: borderaupdfbc},
    { path: '/finance/mandatpdfbc/:idM', name: 'Mandat', component: mandatpdfbc},

]

export default routes;