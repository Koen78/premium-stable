/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EquineSpeciesComponentsPage, EquineSpeciesDeleteDialog, EquineSpeciesUpdatePage } from './equine-species-my-suffix.page-object';

const expect = chai.expect;

describe('EquineSpecies e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let equineSpeciesUpdatePage: EquineSpeciesUpdatePage;
    let equineSpeciesComponentsPage: EquineSpeciesComponentsPage;
    let equineSpeciesDeleteDialog: EquineSpeciesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EquineSpecies', async () => {
        await navBarPage.goToEntity('equine-species-my-suffix');
        equineSpeciesComponentsPage = new EquineSpeciesComponentsPage();
        expect(await equineSpeciesComponentsPage.getTitle()).to.eq('Equine Species');
    });

    it('should load create EquineSpecies page', async () => {
        await equineSpeciesComponentsPage.clickOnCreateButton();
        equineSpeciesUpdatePage = new EquineSpeciesUpdatePage();
        expect(await equineSpeciesUpdatePage.getPageTitle()).to.eq('Create or edit a Equine Species');
        await equineSpeciesUpdatePage.cancel();
    });

    it('should create and save EquineSpecies', async () => {
        const nbButtonsBeforeCreate = await equineSpeciesComponentsPage.countDeleteButtons();

        await equineSpeciesComponentsPage.clickOnCreateButton();
        await promise.all([equineSpeciesUpdatePage.setDescriptionInput('description')]);
        expect(await equineSpeciesUpdatePage.getDescriptionInput()).to.eq('description');
        await equineSpeciesUpdatePage.save();
        expect(await equineSpeciesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await equineSpeciesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EquineSpecies', async () => {
        const nbButtonsBeforeDelete = await equineSpeciesComponentsPage.countDeleteButtons();
        await equineSpeciesComponentsPage.clickOnLastDeleteButton();

        equineSpeciesDeleteDialog = new EquineSpeciesDeleteDialog();
        expect(await equineSpeciesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Equine Species?');
        await equineSpeciesDeleteDialog.clickOnConfirmButton();

        expect(await equineSpeciesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
