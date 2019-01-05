/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    LevelJumpingHisComponentsPage,
    LevelJumpingHisDeleteDialog,
    LevelJumpingHisUpdatePage
} from './level-jumping-his-my-suffix.page-object';

const expect = chai.expect;

describe('LevelJumpingHis e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let levelJumpingHisUpdatePage: LevelJumpingHisUpdatePage;
    let levelJumpingHisComponentsPage: LevelJumpingHisComponentsPage;
    let levelJumpingHisDeleteDialog: LevelJumpingHisDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load LevelJumpingHis', async () => {
        await navBarPage.goToEntity('level-jumping-his-my-suffix');
        levelJumpingHisComponentsPage = new LevelJumpingHisComponentsPage();
        expect(await levelJumpingHisComponentsPage.getTitle()).to.eq('Level Jumping His');
    });

    it('should load create LevelJumpingHis page', async () => {
        await levelJumpingHisComponentsPage.clickOnCreateButton();
        levelJumpingHisUpdatePage = new LevelJumpingHisUpdatePage();
        expect(await levelJumpingHisUpdatePage.getPageTitle()).to.eq('Create or edit a Level Jumping His');
        await levelJumpingHisUpdatePage.cancel();
    });

    it('should create and save LevelJumpingHis', async () => {
        const nbButtonsBeforeCreate = await levelJumpingHisComponentsPage.countDeleteButtons();

        await levelJumpingHisComponentsPage.clickOnCreateButton();
        await promise.all([
            levelJumpingHisUpdatePage.setDateInput('2000-12-31'),
            levelJumpingHisUpdatePage.horseSelectLastOption(),
            levelJumpingHisUpdatePage.levelJumpingSelectLastOption()
        ]);
        expect(await levelJumpingHisUpdatePage.getDateInput()).to.eq('2000-12-31');
        await levelJumpingHisUpdatePage.save();
        expect(await levelJumpingHisUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await levelJumpingHisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last LevelJumpingHis', async () => {
        const nbButtonsBeforeDelete = await levelJumpingHisComponentsPage.countDeleteButtons();
        await levelJumpingHisComponentsPage.clickOnLastDeleteButton();

        levelJumpingHisDeleteDialog = new LevelJumpingHisDeleteDialog();
        expect(await levelJumpingHisDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Level Jumping His?');
        await levelJumpingHisDeleteDialog.clickOnConfirmButton();

        expect(await levelJumpingHisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
