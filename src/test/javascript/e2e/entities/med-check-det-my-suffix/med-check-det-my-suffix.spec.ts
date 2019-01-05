/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MedCheckDetComponentsPage, MedCheckDetDeleteDialog, MedCheckDetUpdatePage } from './med-check-det-my-suffix.page-object';

const expect = chai.expect;

describe('MedCheckDet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let medCheckDetUpdatePage: MedCheckDetUpdatePage;
    let medCheckDetComponentsPage: MedCheckDetComponentsPage;
    let medCheckDetDeleteDialog: MedCheckDetDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load MedCheckDets', async () => {
        await navBarPage.goToEntity('med-check-det-my-suffix');
        medCheckDetComponentsPage = new MedCheckDetComponentsPage();
        expect(await medCheckDetComponentsPage.getTitle()).to.eq('Med Check Dets');
    });

    it('should load create MedCheckDet page', async () => {
        await medCheckDetComponentsPage.clickOnCreateButton();
        medCheckDetUpdatePage = new MedCheckDetUpdatePage();
        expect(await medCheckDetUpdatePage.getPageTitle()).to.eq('Create or edit a Med Check Det');
        await medCheckDetUpdatePage.cancel();
    });

    it('should create and save MedCheckDets', async () => {
        const nbButtonsBeforeCreate = await medCheckDetComponentsPage.countDeleteButtons();

        await medCheckDetComponentsPage.clickOnCreateButton();
        await promise.all([
            medCheckDetUpdatePage.setCodeInput('code'),
            medCheckDetUpdatePage.setResultInput('result'),
            medCheckDetUpdatePage.medCheckSelectLastOption()
        ]);
        expect(await medCheckDetUpdatePage.getCodeInput()).to.eq('code');
        expect(await medCheckDetUpdatePage.getResultInput()).to.eq('result');
        await medCheckDetUpdatePage.save();
        expect(await medCheckDetUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await medCheckDetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last MedCheckDet', async () => {
        const nbButtonsBeforeDelete = await medCheckDetComponentsPage.countDeleteButtons();
        await medCheckDetComponentsPage.clickOnLastDeleteButton();

        medCheckDetDeleteDialog = new MedCheckDetDeleteDialog();
        expect(await medCheckDetDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Med Check Det?');
        await medCheckDetDeleteDialog.clickOnConfirmButton();

        expect(await medCheckDetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
