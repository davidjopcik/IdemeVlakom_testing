[
    //2. trieda
    "bez miestenky",
    "miestenka",
    "miestenka (ľahko dostupné miesto)",
    "miestenka (detské kupé)",
    //1.trieda
    "miestenka",
    "miestenka (ľahký prístup)",
    //Na spanie
    "ležadlo (6-miestne kupé)",
    "ležadlo (4-miestne kupé)",
    "lôžko (3-miestne kupé Triple)",
    "lôžko (1-miestne kupé Single)",
    

]



class PassengerCategories{
    
    //Vekové kategórie
    get dieta_0_5() {
        return $('//*[@text="Dieťa  0 - 5 r."]')
    }  
    get dieta_6_15() {
        return $('//*[@text="Dieťa  6 - 15 r."]')
    }  
    get mlady_16_25() {
        return $('//*[@text="Mladý  16 - 25 r."]')
    }
    get dospely_26_61() {
        return $('//*[@text="Dospelý  26 - 61 r."]')
    }
    get dospely_62_69() {
        return $('//*[@text="Dospelý  62 - 69 r."]')
    }
    get dospely_70() {
        return $('//*[@text="Dospelý  70+ r."]')
    }
 

    //Zľavové kategórie

    get bez_zlavy() {
        return $('//*[@text="Bez zľavy"]')
    }
    get preukaz_pre_dochodcu_do_62() {
        return $('//*[@text="Preukaz pre dôchodcu do 62 r."]')
    }
    get KLASIK_RAILPLUS() {
        return $('//*[@text="KLASIK RAILPLUS"]')
    }
    get SENIOR_RAILPLUS() {
        return $('//*[@text="MAXI KLASIK"]')
    }
    get MAXI_KLASIK() {
        return $('//*[@text="Dieťa  0 - 5 r."]')
    }
    get preukaz_TZP() {
        return $('//*[@text="Preukaz ŤZP"]')
    }
    get preukaz_TZP_S() {
        return $('//*[@text="Preukaz ŤZP-S"]')
    }
    get Sprievodca_TZP_S() {
        return $('//*[@text="Sprievodca ŤZP-S"]')
    }
    get zeleznicny_preukaz_SR() {
        return $('//*[@text="Železničný preukaz SR"]')
    }
    get zeleznicny_preukaz_CD() {
        return $('//*[@text="Železničný preukaz ČD"]')
    }
    get drzitel_tratoveho_listka() {
        return $('//*[@text="Držiteľ traťového lístka"]')
    }
    get medzinarodny_listok_interrail() {
        return $('//*[@text="Medzinárodný lístok/Interrail"]')
    }
    get preukaz_pre_obcana_od_70() {
        return $('//*[@text="Preukaz pre občana od 70 r."]')
    }
    get preukaz_pre_obcana_od_62() {
        return $('//*[@text="Preukaz pre občana od 62 r."]')
    }
    get pohoda(){
        return $('//*[@text="POHODA"]')

    }

    //Ziak/student
    get preukaz_pre_ziaka_studenta() {
        return $('//*[@text="Preukaz pre žiaka/študenta"]')
    }
    get ISIC_aktivovany_skolou() {
        return $('//*[@text="ISIC aktivovaný školou v SR"]')
    }
    get drzitel_tratoveho_listka_student() {
        return $('//*[@text="Dieťa 0 - 5 r."]')
    }
    get preukaz_pre_dieta_do_16() {
        return $('//*[@text="Držiteľ trať. lístka - študent"]')
    }

    //Mlady
    get junior_railplus() {
        return $('//*[@text="JUNIOR RAILPLUS"]')
    }

   

}
export default new PassengerCategories()
