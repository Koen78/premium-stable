/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ColorComponentsPage, ColorDeleteDialog, ColorUpdatePage } from './color-my-suffix.page-object';

const expect = chai.expect;

describe('Color e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let colorUpdatePage: ColorUpdatePage;
    let colorComponentsPage: ColorComponentsPage;
    let colorDeleteDialog: ColorDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Colors', async () => {
        await navBarPage.goToEntity('color-my-suffix');
        colorComponentsPage = new ColorComponentsPage();
        expect(await colorComponentsPage.getTitle()).to.eq('Colors');
    });

    it('should load create Color page', async () => {
        await colorComponentsPage.clickOnCreateButton();
        colorUpdatePage = new ColorUpdatePage();
        expect(await colorUpdatePage.getPageTitle()).to.eq('Create or edit a Color');
        await colorUpdatePage.cancel();
    });

    it('should create and save Colors', async () => {
        const nbButtonsBeforeCreate = await colorComponentsPage.countDeleteButtons();

        await colorComponentsPage.clickOnCreateButton();
        await promise.all([colorUpdatePage.setColorInput('color')]);
        expect(await colorUpdatePage.getColorInput()).to.eq('color');
        await colorUpdatePage.save();
        expect(await colorUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await colorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Color', async () => {
        const nbButtonsBeforeDelete = await colorComponentsPage.countDeleteButtons();
        await colorComponentsPage.clickOnLastDeleteButton();

        colorDeleteDialog = new ColorDeleteDialog();
        expect(await colorDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Color?');
        await colorDeleteDialog.clickOnConfirmButton();

        expect(await colorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
