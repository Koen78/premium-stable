/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GenderComponentsPage, GenderDeleteDialog, GenderUpdatePage } from './gender-my-suffix.page-object';

const expect = chai.expect;

describe('Gender e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let genderUpdatePage: GenderUpdatePage;
    let genderComponentsPage: GenderComponentsPage;
    let genderDeleteDialog: GenderDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Genders', async () => {
        await navBarPage.goToEntity('gender-my-suffix');
        genderComponentsPage = new GenderComponentsPage();
        expect(await genderComponentsPage.getTitle()).to.eq('Genders');
    });

    it('should load create Gender page', async () => {
        await genderComponentsPage.clickOnCreateButton();
        genderUpdatePage = new GenderUpdatePage();
        expect(await genderUpdatePage.getPageTitle()).to.eq('Create or edit a Gender');
        await genderUpdatePage.cancel();
    });

    it('should create and save Genders', async () => {
        const nbButtonsBeforeCreate = await genderComponentsPage.countDeleteButtons();

        await genderComponentsPage.clickOnCreateButton();
        await promise.all([genderUpdatePage.setGenderInput('gender')]);
        expect(await genderUpdatePage.getGenderInput()).to.eq('gender');
        await genderUpdatePage.save();
        expect(await genderUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await genderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Gender', async () => {
        const nbButtonsBeforeDelete = await genderComponentsPage.countDeleteButtons();
        await genderComponentsPage.clickOnLastDeleteButton();

        genderDeleteDialog = new GenderDeleteDialog();
        expect(await genderDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Gender?');
        await genderDeleteDialog.clickOnConfirmButton();

        expect(await genderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
