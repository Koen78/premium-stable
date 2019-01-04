/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RaceComponentsPage, RaceDeleteDialog, RaceUpdatePage } from './race-my-suffix.page-object';

const expect = chai.expect;

describe('Race e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let raceUpdatePage: RaceUpdatePage;
    let raceComponentsPage: RaceComponentsPage;
    let raceDeleteDialog: RaceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Races', async () => {
        await navBarPage.goToEntity('race-my-suffix');
        raceComponentsPage = new RaceComponentsPage();
        expect(await raceComponentsPage.getTitle()).to.eq('Races');
    });

    it('should load create Race page', async () => {
        await raceComponentsPage.clickOnCreateButton();
        raceUpdatePage = new RaceUpdatePage();
        expect(await raceUpdatePage.getPageTitle()).to.eq('Create or edit a Race');
        await raceUpdatePage.cancel();
    });

    it('should create and save Races', async () => {
        const nbButtonsBeforeCreate = await raceComponentsPage.countDeleteButtons();

        await raceComponentsPage.clickOnCreateButton();
        await promise.all([
            raceUpdatePage.setDescriptionInput('description'),
            raceUpdatePage.setDateInput('2000-12-31'),
            raceUpdatePage.countrySelectLastOption()
        ]);
        expect(await raceUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await raceUpdatePage.getDateInput()).to.eq('2000-12-31');
        await raceUpdatePage.save();
        expect(await raceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await raceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Race', async () => {
        const nbButtonsBeforeDelete = await raceComponentsPage.countDeleteButtons();
        await raceComponentsPage.clickOnLastDeleteButton();

        raceDeleteDialog = new RaceDeleteDialog();
        expect(await raceDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Race?');
        await raceDeleteDialog.clickOnConfirmButton();

        expect(await raceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
