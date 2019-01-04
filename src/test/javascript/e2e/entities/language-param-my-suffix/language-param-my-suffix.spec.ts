/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LanguageParamComponentsPage, LanguageParamDeleteDialog, LanguageParamUpdatePage } from './language-param-my-suffix.page-object';

const expect = chai.expect;

describe('LanguageParam e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let languageParamUpdatePage: LanguageParamUpdatePage;
    let languageParamComponentsPage: LanguageParamComponentsPage;
    let languageParamDeleteDialog: LanguageParamDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load LanguageParams', async () => {
        await navBarPage.goToEntity('language-param-my-suffix');
        languageParamComponentsPage = new LanguageParamComponentsPage();
        expect(await languageParamComponentsPage.getTitle()).to.eq('Language Params');
    });

    it('should load create LanguageParam page', async () => {
        await languageParamComponentsPage.clickOnCreateButton();
        languageParamUpdatePage = new LanguageParamUpdatePage();
        expect(await languageParamUpdatePage.getPageTitle()).to.eq('Create or edit a Language Param');
        await languageParamUpdatePage.cancel();
    });

    it('should create and save LanguageParams', async () => {
        const nbButtonsBeforeCreate = await languageParamComponentsPage.countDeleteButtons();

        await languageParamComponentsPage.clickOnCreateButton();
        await promise.all([languageParamUpdatePage.setDescriptionInput('description')]);
        expect(await languageParamUpdatePage.getDescriptionInput()).to.eq('description');
        await languageParamUpdatePage.save();
        expect(await languageParamUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await languageParamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last LanguageParam', async () => {
        const nbButtonsBeforeDelete = await languageParamComponentsPage.countDeleteButtons();
        await languageParamComponentsPage.clickOnLastDeleteButton();

        languageParamDeleteDialog = new LanguageParamDeleteDialog();
        expect(await languageParamDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Language Param?');
        await languageParamDeleteDialog.clickOnConfirmButton();

        expect(await languageParamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
