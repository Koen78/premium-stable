/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedCheckXrayComponentsPage, MedCheckXrayDeleteDialog, MedCheckXrayUpdatePage } from './med-check-xray-my-suffix.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('MedCheckXray e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let medCheckXrayUpdatePage: MedCheckXrayUpdatePage;
    let medCheckXrayComponentsPage: MedCheckXrayComponentsPage;
    let medCheckXrayDeleteDialog: MedCheckXrayDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MedCheckXrays', async () => {
        await navBarPage.goToEntity('med-check-xray-my-suffix');
        medCheckXrayComponentsPage = new MedCheckXrayComponentsPage();
        expect(await medCheckXrayComponentsPage.getTitle()).to.eq('Med Check Xrays');
    });

    it('should load create MedCheckXray page', async () => {
        await medCheckXrayComponentsPage.clickOnCreateButton();
        medCheckXrayUpdatePage = new MedCheckXrayUpdatePage();
        expect(await medCheckXrayUpdatePage.getPageTitle()).to.eq('Create or edit a Med Check Xray');
        await medCheckXrayUpdatePage.cancel();
    });

    it('should create and save MedCheckXrays', async () => {
        const nbButtonsBeforeCreate = await medCheckXrayComponentsPage.countDeleteButtons();

        await medCheckXrayComponentsPage.clickOnCreateButton();
        await promise.all([
            medCheckXrayUpdatePage.setDescriptionInput('description'),
            medCheckXrayUpdatePage.setImageInput(absolutePath),
            medCheckXrayUpdatePage.medCheckSelectLastOption()
        ]);
        expect(await medCheckXrayUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await medCheckXrayUpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        await medCheckXrayUpdatePage.save();
        expect(await medCheckXrayUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await medCheckXrayComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MedCheckXray', async () => {
        const nbButtonsBeforeDelete = await medCheckXrayComponentsPage.countDeleteButtons();
        await medCheckXrayComponentsPage.clickOnLastDeleteButton();

        medCheckXrayDeleteDialog = new MedCheckXrayDeleteDialog();
        expect(await medCheckXrayDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Med Check Xray?');
        await medCheckXrayDeleteDialog.clickOnConfirmButton();

        expect(await medCheckXrayComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
