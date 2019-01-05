/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedCheckComponentsPage, MedCheckDeleteDialog, MedCheckUpdatePage } from './med-check-my-suffix.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('MedCheck e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let medCheckUpdatePage: MedCheckUpdatePage;
    let medCheckComponentsPage: MedCheckComponentsPage;
    let medCheckDeleteDialog: MedCheckDeleteDialog;
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

    it('should load MedChecks', async () => {
        await navBarPage.goToEntity('med-check-my-suffix');
        medCheckComponentsPage = new MedCheckComponentsPage();
        expect(await medCheckComponentsPage.getTitle()).to.eq('Med Checks');
    });

    it('should load create MedCheck page', async () => {
        await medCheckComponentsPage.clickOnCreateButton();
        medCheckUpdatePage = new MedCheckUpdatePage();
        expect(await medCheckUpdatePage.getPageTitle()).to.eq('Create or edit a Med Check');
        await medCheckUpdatePage.cancel();
    });

    it('should create and save MedChecks', async () => {
        const nbButtonsBeforeCreate = await medCheckComponentsPage.countDeleteButtons();

        await medCheckComponentsPage.clickOnCreateButton();
        await promise.all([
            medCheckUpdatePage.setDateInput('2000-12-31'),
            medCheckUpdatePage.setShortDescriptionInput('shortDescription'),
            medCheckUpdatePage.setResultDescriptionInput('resultDescription'),
            medCheckUpdatePage.setPdfInput(absolutePath),
            medCheckUpdatePage.horseSelectLastOption()
        ]);
        expect(await medCheckUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await medCheckUpdatePage.getShortDescriptionInput()).to.eq('shortDescription');
        expect(await medCheckUpdatePage.getResultDescriptionInput()).to.eq('resultDescription');
        expect(await medCheckUpdatePage.getPdfInput()).to.endsWith(fileNameToUpload);
        await medCheckUpdatePage.save();
        expect(await medCheckUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await medCheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MedCheck', async () => {
        const nbButtonsBeforeDelete = await medCheckComponentsPage.countDeleteButtons();
        await medCheckComponentsPage.clickOnLastDeleteButton();

        medCheckDeleteDialog = new MedCheckDeleteDialog();
        expect(await medCheckDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Med Check?');
        await medCheckDeleteDialog.clickOnConfirmButton();

        expect(await medCheckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
