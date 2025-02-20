import { configureStore } from "@reduxjs/toolkit";
import { addMultiComponentReducer } from "./reducers/addMultiComponenet";
import { sectionStateReducer } from "./reducers/sectionsState";
import { sidebarMunuReducer } from "./reducers/sidebarMenus";
import { universalThemeReducer } from "./reducers/universalStyles";


export const store = configureStore({
    reducer: {
        [sidebarMunuReducer.name]: sidebarMunuReducer.reducer,
        [sectionStateReducer.name]: sectionStateReducer.reducer,
        [addMultiComponentReducer.name]: addMultiComponentReducer.reducer,
        [universalThemeReducer.name]: universalThemeReducer.reducer
    }
})