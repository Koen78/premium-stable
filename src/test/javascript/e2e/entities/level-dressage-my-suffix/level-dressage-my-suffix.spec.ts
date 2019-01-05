/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LevelDressageComponentsPage, LevelDressageDeleteDialog, LevelDressageUpdatePage } from './level-dressage-my-suffix.page-object';

const expect = chai.expect;

describe('LevelDressage e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let levelDressageUpdatePage: LevelDressageUpdatePage;
    let levelDressageComponentsPage: LevelDressageComponentsPage;
    let levelDressageDeleteDialog: LevelDressageDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load LevelDressages', async () => {
        await navBarPage.goToEntity('level-dressage-my-suffix');
        levelDressageComponentsPage = new LevelDressageComponentsPage();
        expect(await levelDressageComponentsPage.getTitle()).to.eq('Level Dressages');
    });

    it('should load create LevelDressage page', async () => {
        await levelDressageComponentsPage.clickOnCreateButton();
        levelDressageUpdatePage = new LevelDressageUpdatePage();
        expect(await levelDressageUpdatePage.getPageTitle()).to.eq('Create or edit a Level Dressage');
        await levelDressageUpdatePage.cancel();
    });

    it('should create and save LevelDressages', async () => {
        const nbButtonsBeforeCreate = await levelDressageComponentsPage.countDeleteButtons();

        await levelDressageComponentsPage.clickOnCreateButton();
        await promise.all([levelDressageUpdatePage.setDescriptionInput('description')]);
        expect(await levelDressageUpdatePage.getDescriptionInput()).to.eq('description');
        await levelDressageUpdatePage.save();
        expect(await levelDressageUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await levelDressageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last LevelDressage', async () => {
        const nbButtonsBeforeDelete = await levelDressageComponentsPage.countDeleteButtons();
        await levelDressageComponentsPage.clickOnLastDeleteButton();

        levelDressageDeleteDialog = new LevelDressageDeleteDialog();
        expect(await levelDressageDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Level Dressage?');
        await levelDressageDeleteDialog.clickOnConfirmButton();

        expect(await levelDressageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
