/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StableComponentsPage, StableDeleteDialog, StableUpdatePage } from './stable-my-suffix.page-object';

const expect = chai.expect;

describe('Stable e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let stableUpdatePage: StableUpdatePage;
    let stableComponentsPage: StableComponentsPage;
    let stableDeleteDialog: StableDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Stables', async () => {
        await navBarPage.goToEntity('stable-my-suffix');
        stableComponentsPage = new StableComponentsPage();
        expect(await stableComponentsPage.getTitle()).to.eq('Stables');
    });

    it('should load create Stable page', async () => {
        await stableComponentsPage.clickOnCreateButton();
        stableUpdatePage = new StableUpdatePage();
        expect(await stableUpdatePage.getPageTitle()).to.eq('Create or edit a Stable');
        await stableUpdatePage.cancel();
    });

    it('should create and save Stables', async () => {
        const nbButtonsBeforeCreate = await stableComponentsPage.countDeleteButtons();

        await stableComponentsPage.clickOnCreateButton();
        await promise.all([
            stableUpdatePage.setDescriptionInput('description'),
            stableUpdatePage.setStreetInput('street'),
            stableUpdatePage.setHouseNumberInput('houseNumber'),
            stableUpdatePage.setPostalcodeInput('postalcode'),
            stableUpdatePage.setCityInput('city'),
            stableUpdatePage.countrySelectLastOption()
        ]);
        expect(await stableUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await stableUpdatePage.getStreetInput()).to.eq('street');
        expect(await stableUpdatePage.getHouseNumberInput()).to.eq('houseNumber');
        expect(await stableUpdatePage.getPostalcodeInput()).to.eq('postalcode');
        expect(await stableUpdatePage.getCityInput()).to.eq('city');
        await stableUpdatePage.save();
        expect(await stableUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await stableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Stable', async () => {
        const nbButtonsBeforeDelete = await stableComponentsPage.countDeleteButtons();
        await stableComponentsPage.clickOnLastDeleteButton();

        stableDeleteDialog = new StableDeleteDialog();
        expect(await stableDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Stable?');
        await stableDeleteDialog.clickOnConfirmButton();

        expect(await stableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
