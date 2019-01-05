/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompetitionComponentsPage, CompetitionDeleteDialog, CompetitionUpdatePage } from './competition-my-suffix.page-object';

const expect = chai.expect;

describe('Competition e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let competitionUpdatePage: CompetitionUpdatePage;
    let competitionComponentsPage: CompetitionComponentsPage;
    let competitionDeleteDialog: CompetitionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Competitions', async () => {
        await navBarPage.goToEntity('competition-my-suffix');
        competitionComponentsPage = new CompetitionComponentsPage();
        expect(await competitionComponentsPage.getTitle()).to.eq('Competitions');
    });

    it('should load create Competition page', async () => {
        await competitionComponentsPage.clickOnCreateButton();
        competitionUpdatePage = new CompetitionUpdatePage();
        expect(await competitionUpdatePage.getPageTitle()).to.eq('Create or edit a Competition');
        await competitionUpdatePage.cancel();
    });

    it('should create and save Competitions', async () => {
        const nbButtonsBeforeCreate = await competitionComponentsPage.countDeleteButtons();

        await competitionComponentsPage.clickOnCreateButton();
        await promise.all([
            competitionUpdatePage.setDateInput('2000-12-31'),
            competitionUpdatePage.setDescriptionInput('description'),
            competitionUpdatePage.setResultInput('result'),
            competitionUpdatePage.horseSelectLastOption(),
            competitionUpdatePage.raceSelectLastOption()
        ]);
        expect(await competitionUpdatePage.getDateInput()).to.eq('2000-12-31');
        expect(await competitionUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await competitionUpdatePage.getResultInput()).to.eq('result');
        await competitionUpdatePage.save();
        expect(await competitionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await competitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Competition', async () => {
        const nbButtonsBeforeDelete = await competitionComponentsPage.countDeleteButtons();
        await competitionComponentsPage.clickOnLastDeleteButton();

        competitionDeleteDialog = new CompetitionDeleteDialog();
        expect(await competitionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Competition?');
        await competitionDeleteDialog.clickOnConfirmButton();

        expect(await competitionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
