import { configureStore } from "@reduxjs/toolkit";
import { addMultiComponentReducer } from "./reducers/addMultiComponenet";
import { sectionStateReducer } from "./reducers/sectionsState";
import { selectedComponentReducer } from "./reducers/selectedComponent";
import { sidebarMunuReducer } from "./reducers/sidebarMenus";
import { universalThemeReducer } from "./reducers/universalStyles";
import { websiteIdReducer } from "./reducers/websiteId";


export const store = configureStore({
    reducer: {
        [sidebarMunuReducer.name]: sidebarMunuReducer.reducer,
        [sectionStateReducer.name]: sectionStateReducer.reducer,
        [addMultiComponentReducer.name]: addMultiComponentReducer.reducer,
        [universalThemeReducer.name]: universalThemeReducer.reducer,
        [selectedComponentReducer.name]: selectedComponentReducer.reducer,
        [websiteIdReducer.name]: websiteIdReducer.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})