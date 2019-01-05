/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    LevelDressageHisComponentsPage,
    LevelDressageHisDeleteDialog,
    LevelDressageHisUpdatePage
} from './level-dressage-his-my-suffix.page-object';

const expect = chai.expect;

describe('LevelDressageHis e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let levelDressageHisUpdatePage: LevelDressageHisUpdatePage;
    let levelDressageHisComponentsPage: LevelDressageHisComponentsPage;
    let levelDressageHisDeleteDialog: LevelDressageHisDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load LevelDressageHis', async () => {
        await navBarPage.goToEntity('level-dressage-his-my-suffix');
        levelDressageHisComponentsPage = new LevelDressageHisComponentsPage();
        expect(await levelDressageHisComponentsPage.getTitle()).to.eq('Level Dressage His');
    });

    it('should load create LevelDressageHis page', async () => {
        await levelDressageHisComponentsPage.clickOnCreateButton();
        levelDressageHisUpdatePage = new LevelDressageHisUpdatePage();
        expect(await levelDressageHisUpdatePage.getPageTitle()).to.eq('Create or edit a Level Dressage His');
        await levelDressageHisUpdatePage.cancel();
    });

    it('should create and save LevelDressageHis', async () => {
        const nbButtonsBeforeCreate = await levelDressageHisComponentsPage.countDeleteButtons();

        await levelDressageHisComponentsPage.clickOnCreateButton();
        await promise.all([
            levelDressageHisUpdatePage.setDateInput('2000-12-31'),
            levelDressageHisUpdatePage.horseSelectLastOption(),
            levelDressageHisUpdatePage.levelDressageSelectLastOption()
        ]);
        expect(await levelDressageHisUpdatePage.getDateInput()).to.eq('2000-12-31');
        await levelDressageHisUpdatePage.save();
        expect(await levelDressageHisUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await levelDressageHisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last LevelDressageHis', async () => {
        const nbButtonsBeforeDelete = await levelDressageHisComponentsPage.countDeleteButtons();
        await levelDressageHisComponentsPage.clickOnLastDeleteButton();

        levelDressageHisDeleteDialog = new LevelDressageHisDeleteDialog();
        expect(await levelDressageHisDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Level Dressage His?');
        await levelDressageHisDeleteDialog.clickOnConfirmButton();

        expect(await levelDressageHisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
